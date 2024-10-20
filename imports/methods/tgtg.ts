import { createMethod } from "meteor/jam:method";
import { Meteor } from "meteor/meteor";
import { getSentry } from ".";
import * as tgtg from "/imports/tgtg/api";
import { SyncedUser } from "/imports/types";
import refreshToken from "../middlewares/refreshToken";

export const items = createMethod({
  name: "items",
  serverOnly: true,
  schema: {
    lat: Number,
    lng: Number,
    radius: Number,
  },
  before: [...refreshToken],
  async run({
    lat,
    lng,
    radius,
  }: {
    lat: number;
    lng: number;
    radius: number;
  }) {
    const Sentry = getSentry();
    const user = (await Meteor.userAsync()) as SyncedUser;

    const res = await tgtg.getItems(
      user.profile.tgtg.userId,
      user.profile.tgtg.accessToken,
      user.profile.tgtg.cookie,
      lat,
      lng,
      radius
    );
    if (res.status != 200) {
      console.error("res not 200 : ");
      Sentry.setContext("res", res);
      Sentry.captureException("TGTG did not return 2000", {
        tags: {
          method: "items",
        },
      });
      throw new Meteor.Error(500, "did not return 200");
    }
    return res.data;
  },
});
