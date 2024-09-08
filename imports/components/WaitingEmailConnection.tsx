import React, { useContext, useState } from "react";
import { UserContext } from "./ContextProvider";
import { Accounts } from "meteor/accounts-base";
import { Button } from "./ui/button";
import { Meteor } from "meteor/meteor";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "./ui/card";
import { toast } from "./hooks/use-toast";

const WaitingEmailConnection = () => {
  const [isButtonsEnabled, setIsButtonsEnabled] = useState(true);
  const user = useContext(UserContext) as Meteor.User;

  const logOut = () => {
    Accounts.logout();
  };

  const checkAccount = () => {
    setIsButtonsEnabled(false);
    Meteor.callAsync("auth/sync/check")
      .then(
        (value) => {
          console.log(value);
        },
        (err: Meteor.Error) => {
          toast({
            title: "Erreur",
            description:
              "reason" in err ? (err as any).reason : "Erreur inconnue.",
            variant: "error",
          });
        }
      )
      .catch((err: Meteor.Error) => {
        console.log(err);
      })
      .finally(() => setIsButtonsEnabled(true));
  };

  const sendNewEmail = () => {
    setIsButtonsEnabled(false);
    Meteor.callAsync("auth/sync/send")
      .then(
        (value) => {
          if (value === true) {
            toast({
              title: "New email sent.",
              // description: "Un nouveau mail a été"
            });
          } else console.log(value);
        },
        (err: Meteor.Error) => {
          toast({
            title: "Erreur",
            description:
              "reason" in err ? (err as any).reason : "Erreur inconnue.",
            variant: "error",
          });
        }
      )
      .catch((err: Meteor.Error) => {
        console.log(err);
      })
      .finally(() => setIsButtonsEnabled(true));
  };

  return (
    <>
      <div className="flex overflow-scroll h-full absolute w-full justify-safe-center items-safe-center bg-tgtg">
        <Card className="m-3 max-w-xl min-w-72 h-fit">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              You have to synchronize your Too Good To Go account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              You are connected as {user?.emails ? user.emails[0].address : ""}.
            </div>
            <div>
              Too Good To Go sent you a connection email. Please open the link
              in a browser (not in the Too Good To Go application).
            </div>
            <div className="mt-3 flex w-full justify-between flex-wrap">
              <Button
                onClick={checkAccount}
                disabled={isButtonsEnabled ? false : true}
                className="my-1 mr-2"
              >
                I opened the link
              </Button>
              <Button
                onClick={sendNewEmail}
                disabled={isButtonsEnabled ? false : true}
                className="my-1"
              >
                Send a new email
              </Button>
            </div>
            <Button
              onClick={logOut}
              disabled={isButtonsEnabled ? false : true}
              className="w-full mt-3"
            >
              Log out
            </Button>
            <Button
              onClick={() => {
                Meteor.callAsync("auth/sync/reset").then((value) => {
                  toast({
                    title: "Reset OK",
                  });
                });
              }}
              disabled={isButtonsEnabled ? false : true}
              className="w-full mt-3"
            >
              Reset sync
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default WaitingEmailConnection;
