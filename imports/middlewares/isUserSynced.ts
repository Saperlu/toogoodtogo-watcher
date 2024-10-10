import { MeteorUser, MethodRequestWithContext, UserType } from "../types";
import loadUser from "./loadUser";

const isUserSynced = [
  ...loadUser,
  async () => {
    const user = (this as unknown as MethodRequestWithContext).context
      .user as MeteorUser;
    if (user?.profile.userType == UserType.Synced) return;
    throw new Meteor.Error(403, "Not synced user.");
  },
];

export default isUserSynced;
