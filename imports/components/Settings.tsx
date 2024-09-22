import React from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";

const Settings = () => {
  return (
    <>
      <div className="flex overflow-scroll h-full absolute w-full justify-safe-center items-safe-center bg-tgtg">
        <Card className="m-3 max-w-xl min-w-72 h-fit">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </>
  );
};

export default Settings;
