import { createMethod } from "meteor/jam:method";
import { Meteor } from "meteor/meteor";
import { getSentry } from "/imports/methods";
import { SyncedUser } from "/imports/types";
import isUserSynced from "/imports/middlewares/isUserSynced";
import { z } from "zod";

export const formSchema = z.object({
  kind: z.literal("Discord"),
  name: z.string(),
  url: z.string(),
});

export const createIntegration = createMethod({
  name: "integrations-add",
  serverOnly: true,
  schema: formSchema,
  before: [...isUserSynced],
  async run({
    kind,
    name,
    url,
  }: {
    kind: "Discord";
    name: string;
    url: string;
  }) {
    const Sentry = getSentry();
    const user = (await Meteor.userAsync()) as SyncedUser;
    if (name.endsWith("a")) {
    } else {
      throw new Meteor.Error(400, "not end with A");
    }

    // check if name already exists
    await Meteor.users.updateAsync(user._id, {
      $push: {
        "profile.integrations": {
          kind,
          name,
          url,
        },
      },
    });
    return "OK";

    // if (res.status != 200) {
    //   console.error("res not 200 : ");
    //   Sentry.setContext("res", res);
    //   Sentry.captureException("TGTG did not return 2000", {
    //     tags: {
    //       method: "items",
    //     },
    //   });
    //   throw new Meteor.Error(500, "did not return 200");
    // }
    // return res.data;
  },
});
