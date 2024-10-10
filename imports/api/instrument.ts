import * as Sentry from "@sentry/node";
import { Meteor } from "meteor/meteor";
const { nodeProfilingIntegration } = require("@sentry/profiling-node");

Sentry.init({
  dsn: Meteor.settings.private.SENTRY_DSN,
  integrations: [nodeProfilingIntegration()],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions

  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

export default Sentry;
