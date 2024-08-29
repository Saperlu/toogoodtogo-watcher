import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Meteor } from "meteor/meteor";
import App from "/imports/ui/App";
import ContextProvider from "/imports/ui/ContextProvider";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/map",
    element: <App/>,
  },
  {
    path: "/register",
    element: <Link to={'/map'} className="text-white bg-tgtg w-1/6 aspect-square top-2 right-2 absolute">Go to Map</Link>,
  },
]);


Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container!);
  root.render(
    <StrictMode>
      <ContextProvider>
        <RouterProvider router={router} />
        {/* <App /> */}
      </ContextProvider>
    </StrictMode>
  );
});
