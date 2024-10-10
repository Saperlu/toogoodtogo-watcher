import React, { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { UserContext } from "./ContextProvider";
import { SyncedUser } from "../types";

const Notifications = () => {
  const user = useContext(UserContext) as SyncedUser;
  return (
    <>
      <div className="flex overflow-scroll h-full absolute w-full justify-safe-center items-safe-center bg-tgtg">
        <Card className="m-3 max-w-xl min-w-72 h-fit">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </>
  );
};

export default Notifications;
