export const getResolvedValueOrElse = <T = any>(
  valueOrPromise: PromiseLike<T>,
  fallback: any
): T =>
  Object(valueOrPromise).constructor === Promise ? fallback : valueOrPromise;

export const sleep = (milliseconds: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
