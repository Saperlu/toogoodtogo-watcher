import { MeteorUser, MethodRequestWithContext } from "../types";
import createContext from "./createContext";

const loadUser = [
  ...createContext,
  async () => {
    const user = await Meteor.userAsync();
    if (user)
      (this as unknown as MethodRequestWithContext).context.user =
        user as MeteorUser;
  },
];

export default loadUser;
