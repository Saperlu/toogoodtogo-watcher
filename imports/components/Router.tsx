import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Register";
import Login from "/imports/components/Login";
import RouteError from "/imports/components/RouteError";
import WaitingEmailConnection from "/imports/components/WaitingEmailConnection";
import RequiresUnsyncedUser from "./RequiresUnsyncedUser";
import { Toaster } from "./ui/toaster";
import RequiresNoUser from "./RequiresNoUser";
import RequiresSyncedUser from "./RequiresSyncedUser";
import Map from "./Map";
import Settings from "./Settings";
import Integrations from "./Integrations";
import IntegrationsAdd from "./IntegrationsAdd";

const Router = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <RouteError />,
      children: [
        {
          path: "/map",
          element: (
            <RequiresSyncedUser>
              <Map />
            </RequiresSyncedUser>
          ),
        },
        {
          path: "/register",
          element: (
            <RequiresNoUser>
              <Register />
            </RequiresNoUser>
          ),
        },
        {
          path: "/login",
          element: (
            <RequiresNoUser>
              <Login />
            </RequiresNoUser>
          ),
        },
        {
          path: "/waiting",
          element: (
            <RequiresUnsyncedUser>
              <WaitingEmailConnection />
            </RequiresUnsyncedUser>
          ),
        },
        {
          path: "/settings",
          element: (
            <RequiresSyncedUser>
              <Settings />
            </RequiresSyncedUser>
          ),
        },
        {
          path: "/integrations",
          element: (
            <RequiresSyncedUser>
              <Integrations />
            </RequiresSyncedUser>
          ),
        },
        {
          path: "/integrations/add",
          element: (
            <RequiresSyncedUser>
              <IntegrationsAdd />
            </RequiresSyncedUser>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      {isLoading && (
        <div className="z-450 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-tgtg w-1/2 aspect-square rounded-full animate-pulse"></div>
      )}
      <Toaster />
    </>
  );
};

export default Router;
