import { LngLat, LngLatMarker } from "@/types/common";
import axios, { AxiosResponse } from "axios";
import { atom, selector } from "recoil";

export const mapBoundingBoxState = atom<{
  min: LngLat;
  max: LngLat;
}>({
  key: "mapBoundingBox",
  default: { min: { lng: 0, lat: 0 }, max: { lng: 0, lat: 0 } },
});

export const refreshMarkersState = atom<number>({
  key: "refreshMarkers",
  default: 0,
});

export const mapMarkersState = selector<LngLatMarker[]>({
  key: "mapMarkers",
  get: async ({ get }) => {
    get(refreshMarkersState);
    const boundingBox = get(mapBoundingBoxState);
    return axios
      .get("/api/results", {
        params: {
          minLat: boundingBox.min.lat,
          maxLat: boundingBox.max.lat,
          minLong: boundingBox.min.lng,
          maxLong: boundingBox.max.lng,
        },
      })
      .then(
        ({
          data: { data: lnglats },
        }: AxiosResponse<{
          status: string;
          data: LngLatMarker[];
        }>) => lnglats
      ) as Promise<LngLatMarker[]>;
  },
});

export const selectedMarkerState = atom<LngLatMarker | null>({
  key: "selectedMarker",
  default: null,
});
