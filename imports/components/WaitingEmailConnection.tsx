import React, { useContext } from "react";
import { UserContext } from "./ContextProvider";
import { Accounts } from "meteor/accounts-base";
import { Button } from "./ui/button";
import { Meteor } from "meteor/meteor";

const WaitingEmailConnection = () => {
  const user = useContext(UserContext) as Meteor.User;

  const handleClick = () => {
    Accounts.logout();
  };

  return (
    <>
      {/* <div>You are connected as {user.emails}</div> */}
      <div>
        You are connected as {user?.emails ? user.emails[0].address : ""}.
      </div>
      <Button onClick={handleClick}>Log out</Button>
    </>
  );
};

export default WaitingEmailConnection;
