import { Meteor } from "meteor/meteor";
import "/imports/api/methods";
import { Accounts } from "meteor/accounts-base";
import { z, ZodError } from "zod";
import { Mongo } from "meteor/mongo";
import * as tgtg from "/imports/tgtg/api";
import { AxiosError, AxiosResponse } from "axios";
import { LoggedUser, TgtgApiResponseAuthPoll, User } from "/imports/types";

export const WaitingAuthsCollection = new Mongo.Collection("waiting-auths");

const userRegisterSchema = z.object({
  _id: z.string(),
  emails: z
    .array(
      z.object({
        address: z.string().email(),
        verified: z.literal(false),
      })
    )
    .length(1),
  services: z.object({
    password: z.object({
      bcrypt: z.string(),
    }),
  }),
});

// Accounts.validateNewUser((user: Meteor.User) => {
// });

Accounts.onCreateUser(async (_options, user) => {
  let res;
  let parsedUser;
  try {
    parsedUser = userRegisterSchema.parse(user);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Meteor.Error(403, error.errors[0].message);
    }
    throw error;
  }
  // user shape is ok

  try {
    res = await tgtg.authByEmail(parsedUser.emails[0].address);
  } catch (error) {
    if (error instanceof AxiosError)
      throw new Meteor.Error(
        error?.code || 500,
        "Forwarding error : " + error.message
      );
    throw error;
  }
  // did not get an error from TGTG API

  let goodResult;
  try {
    goodResult = z
      .object({
        state: z.literal("WAIT"),
        polling_id: z.string(),
      })
      .parse(res.data);
  } catch (error) {
    if (error instanceof ZodError)
      throw new Meteor.Error(
        500,
        "The email you provided is not related to a Too Good To Go account."
      );
    throw error;
  }
  // API returned a polling ID

  user.profile = {
    email: parsedUser.emails[0].address,
    tgtg: {
      waitingAuths: [goodResult.polling_id],
      accessToken: undefined,
      refreshToken: undefined,
      validUntil: undefined,
    },
  };
  return user;
});

Meteor.methods({
  async "auth/sync/check"() {
    const user = (await Accounts.userAsync()) as LoggedUser;
    let res: AxiosResponse;
    let goodResult;
    bigFor: for (const pollingId of user.profile.tgtg.waitingAuths) {
      console.debug("trying polling : ", pollingId);
      try {
        res = await tgtg.authPoll(user.profile.email, pollingId);
        console.log("res.status : ", res.status);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error?.code || 500, error.message);
          continue bigFor;
        } else throw new Meteor.Error(500, "Unknown error.");
      }
      console.debug("\tgot response from api");
      // did not get an error from TGTG API

      if (
        res.status == 202 ||
        res.status == 403 ||
        res.data?.errors?.[0]?.code == "FAILED_AUTHENTICATION"
      ) {
        console.debug("\tlink was not opened");
        continue bigFor;
      }
      console.debug("\tnot failed connection");
      // did not get typical error when user did not open the url

      try {
        goodResult = z
          .object({
            access_token: z.string(),
            access_token_ttl_seconds: z.number(),
            refresh_token: z.string(),
            startup_data: z.object({
              user_settings: z.object({
                bound_sw: z.object({
                  longitude: z.number(),
                  latitude: z.number(),
                }),
                bound_ne: z.object({
                  longitude: z.number(),
                  latitude: z.number(),
                }),
              }),
            }),
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
      console.debug("\tobject good shape");
      // the received object is the perfect shape

      await Meteor.users.updateAsync(user._id, {
        $set: {
          "profile.tgtg": {
            accessToken: goodResult.access_token,
            validUntil: Date.now() + goodResult.access_token_ttl_seconds,
            refreshToken: goodResult.refresh_token,
          },
          "profile.bound": {
            sw: {
              longitude:
                goodResult.startup_data.user_settings.bound_sw.longitude,
              latitude: goodResult.startup_data.user_settings.bound_sw.latitude,
            },
            ne: {
              longitude:
                goodResult.startup_data.user_settings.bound_ne.longitude,
              latitude: goodResult.startup_data.user_settings.bound_ne.latitude,
            },
          },
        },
      });
      console.debug("\tamazing it worked !");
      return await Meteor.userAsync();
    }

    console.debug("\tthrowing error not opened link");
    throw new Meteor.Error(
      403,
      "Seems like you did not opened the connection link in a browser. Please consult your mailbox."
    );
  },
  async "auth/sync/send"() {
    const user = (await Meteor.userAsync()) as User;
    let res: AxiosResponse;
    try {
      res = await tgtg.authByEmail(user.profile.email);
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Meteor.Error(
          error?.code || 500,
          "Forwarding error : " + error.message
        );
      throw error;
    }
    // did not get an error from TGTG API

    let goodResult;
    try {
      goodResult = z
        .object({
          state: z.literal("WAIT"),
          polling_id: z.string(),
        })
        .parse(res.data);
    } catch (error) {
      if (error instanceof ZodError)
        throw new Meteor.Error(
          500,
          "The email you provided is not related to a Too Good To Go account."
        );
      throw error;
    }
    // API returned a polling ID

    user.profile.tgtg.waitingAuths.push(goodResult.polling_id);
    await Meteor.users.updateAsync(user._id, {
      $set: {
        "profile.tgtg.waitingAuths": user.profile.tgtg.waitingAuths,
      },
    });

    return true;
  },
  async "auth/sync/reset"() {
    const user = (await Meteor.userAsync()) as LoggedUser;
    await Meteor.users.updateAsync(user._id, {
      $set: {
        "profile.tgtg": {
          waitingAuths: [],
        },
      },
    });
    return true;
  },
});

Meteor.startup(async () => {});
