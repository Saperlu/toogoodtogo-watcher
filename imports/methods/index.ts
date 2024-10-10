let Sentry: any;

export const setSentry = (sentryInstance: any) => {
  Sentry = sentryInstance;
};

export const getSentry = () => {
  return Sentry;
};
