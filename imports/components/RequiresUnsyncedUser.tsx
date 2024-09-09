import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserContext } from "./ContextProvider";
import { useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

const RequiresSyncedUser = ({ children }: PropsWithChildren) => {
  const user = useContext(UserContext);
  const isLoading = useTracker(() => {
    return Meteor.loggingIn();
  });
  const [isDelayedLogin, setIsDelayedLogin] = useState(Meteor.loggingIn());
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      const timeout = setTimeout(() => {
        setIsDelayedLogin(false);
      }, 50);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      setIsDelayedLogin(true);
    }
  }, [isLoading, user]);

  useEffect(() => {
    if (!isDelayedLogin) {
      if (!user) navigate("/login"); // No user
      else if (user && "accessToken" in user.profile.tgtg) navigate("/map"); // Synced user
    }
  }, [isDelayedLogin, user]);

  if (isDelayedLogin) {
    return <div>Loading...</div>;
  }

  return user ? <>{children}</> : null;
};

export default RequiresSyncedUser;
