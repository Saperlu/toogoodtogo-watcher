import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Register from "./Register";
import Login from "/imports/components/Login";
import RouteError from "/imports/components/RouteError";
import WaitingEmailConnection from "/imports/components/WaitingEmailConnection";
import RequiresUser from "./RequiresUser";
import { Toaster } from "./ui/toaster";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <RouteError />,
      children: [
        {
          path: "/map",
          element: (
            <RequiresUser>
              <App />
            </RequiresUser>
          ),
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/waiting",
          element: (
            <RequiresUser>
              <WaitingEmailConnection />
            </RequiresUser>
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
