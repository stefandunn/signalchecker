import { Record } from "@prisma/client";

export type Timeout = ReturnType<typeof setTimeout>;
export type Interval = ReturnType<typeof setInterval>;

export type LngLat = Extract<mapboxgl.LngLatLike, { lng: number; lat: number }>;

export type LngLatMarker = LngLat &
  Pick<Record, "device" | "network" | "speed" | "createdAt">;
