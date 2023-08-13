export const getResolvedValueOrElse = <T = any>(
  valueOrPromise: PromiseLike<T>,
  fallback: any
): T =>
  Object(valueOrPromise).constructor === Promise ? fallback : valueOrPromise;

export const sleep = (milliseconds: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

export const colourFromSpeed = (speed: number): string => {
  if (speed < 5) {
    return "#cc3232";
  }
  if (speed < 15) {
    return "#db7b2b";
  }
  if (speed < 20) {
    return "#e7b416";
  }
  if (speed < 40) {
    return "#99c140";
  }

  return "#2dc937";
};
