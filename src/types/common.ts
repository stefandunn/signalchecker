export type Timeout = ReturnType<typeof setTimeout>;
export type Interval = ReturnType<typeof setInterval>;

export type LngLat = Extract<mapboxgl.LngLatLike, { lng: number; lat: number }>;
