import { z, ZodError } from "zod";
import { getSentry } from "../methods";
import { MethodRequestWithContext, SyncedUser } from "../types";
import isUserSynced from "./isUserSynced";
import * as tgtg from "/imports/tgtg/api";

const refreshToken = [
  ...isUserSynced,
  async () => {
    const user = (this as unknown as MethodRequestWithContext).context
      .user as SyncedUser;
    if (user.profile.tgtg.validUntil > new Date(Date.now() - 60000)) return;
    const Sentry = getSentry();

    const res = await tgtg.refreshToken(user.profile.tgtg.refreshToken);
    let goodResult;
    if (res.status != 200) {
      Sentry.setContext("res", res);
      Sentry.captureException("TGTG did not return 200");
      throw new Meteor.Error(500, "did not return 200");
    }

    try {
      goodResult = z
        .object({
          access_token: z.string(),
          access_token_ttl_seconds: z.number(),
          refresh_token: z.string(),
        })
        .parse(res.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(error);
        console.debug("goodResult : ", goodResult);
        console.debug("res.data : ", res.data);
        throw new Meteor.Error(500, "Unknown error.");
      } else throw error;
    }

    await Meteor.users.updateAsync(user._id, {
      $set: {
        "profile.tgtg.accessToken": goodResult.access_token,
        "profile.tgtg.validUntil":
          Date.now() + goodResult.access_token_ttl_seconds * 1000,
        "profile.tgtg.refreshToken": goodResult.refresh_token,
      },
    });
  },
];

export default refreshToken;
