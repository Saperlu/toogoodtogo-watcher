import React, { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { UserContext } from "./ContextProvider";
import { Integrations, SyncedUser } from "../types";
import { ChevronLeft, Pencil, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { removeIntegration } from "../methods/integrations/remove";
import { useToast } from "./hooks/use-toast";

const Integrations = () => {
  const user = useContext(UserContext) as SyncedUser;
  const { toast } = useToast();

  const removeCallback = (name: string) => {
    removeIntegration({ name }).then(
      (value) => {
        toast({
          title: "Success",
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <>
      <div className="flex overflow-scroll h-full absolute w-full justify-safe-center items-safe-center bg-tgtg">
        <Card className="m-3 max-w-xl min-w-72 h-fit">
          <CardHeader className="flex justify-between flex-row items-center">
            <div className="flex flex-row items-center">
              <Link to={"/map"}>
                <ChevronLeft className="my-auto bg-tgtg rounded-full square p-1 w-7 h-7 text-white mr-1" />
              </Link>
              <CardTitle>Integrations</CardTitle>
            </div>
            <Link to={"/integrations/add"}>
              <Plus className="my-auto bg-tgtg rounded-full square p-1 w-7 h-7 text-white" />
            </Link>
          </CardHeader>
          <CardContent>
            {user.profile.integrations.map((integration: Integrations) => {
              return (
                <>
                  <div className="overflow-scroll">
                    <div className="flex flex-row justify-between items-center">
                      <span className="overflow-ellipsis">
                        {integration.name}
                      </span>
                      <div className="flex flex-row text-white">
                        <div className="rounded-full bg-tgtg aspect-square  w-6 h-6 flex items-center justify-center p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-pencil"
                          >
                            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                            <path d="m15 5 4 4" />
                          </svg>
                        </div>
                        <button
                          onClick={() => removeCallback(integration.name)}
                          className="rounded-full bg-tgtg aspect-square ml-1 w-6 h-6 flex items-center justify-center p-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-trash-2"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" x2="10" y1="11" y2="17" />
                            <line x1="14" x2="14" y1="11" y2="17" />
                          </svg>
                        </button>
                        {/* <Trash2 className="bg-tgtg rounded-full square text-white ml-2 " /> */}
                      </div>
                    </div>
                    <br />
                  </div>
                </>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Integrations;
