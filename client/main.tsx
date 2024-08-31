import { Meteor } from "meteor/meteor";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ContextProvider from "../imports/components/ContextProvider";
import Router from "/imports/components/Router";

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container!);

  root.render(
    <StrictMode>
      <ContextProvider>
        <Router />
        {/* <App /> */}
      </ContextProvider>
    </StrictMode>
  );
});
