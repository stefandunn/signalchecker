export const getResolvedValueOrElse = (valueOrPromise: any, fallback: any) =>
  Object(valueOrPromise).constructor === Promise ? fallback : valueOrPromise;
