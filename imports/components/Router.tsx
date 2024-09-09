import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Register from "./Register";
import Login from "/imports/components/Login";
import RouteError from "/imports/components/RouteError";
import WaitingEmailConnection from "/imports/components/WaitingEmailConnection";
import RequiresUnsyncedUser from "./RequiresUnsyncedUser";
import { Toaster } from "./ui/toaster";
import RequiresNoUser from "./RequiresNoUser";
import RequiresSyncedUser from "./RequiresSyncedUser";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <RouteError />,
      children: [
        {
          path: "/map",
          element: (
            <RequiresSyncedUser>
              <App />
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
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default Router;
