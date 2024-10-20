import { createMethod } from "meteor/jam:method";
import { Meteor } from "meteor/meteor";
import { getSentry } from "..";
import { SyncedUser } from "/imports/types";
import { z } from "zod";
import isUserSynced from "/imports/middlewares/isUserSynced";

export const formSchema = z.object({
  name: z.string(),
});

export const removeIntegration = createMethod({
  name: "integrations-remove",
  serverOnly: true,
  schema: formSchema,
  before: [...isUserSynced],
  async run({ name }: { name: string }) {
    const Sentry = getSentry();
    const user = (await Meteor.userAsync()) as SyncedUser;

    // todo verify it exists
    // check if name already exists
    await Meteor.users.updateAsync(user._id, {
      $pull: {
        "profile.integrations": {
          name,
        },
      },
    });
    return "OK";
  },
});
