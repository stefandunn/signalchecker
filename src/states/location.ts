"use client";

import axios, { AxiosResponse } from "axios";
import mapboxgl from "mapbox-gl";
import { atom, selector } from "recoil";

export type UserLocation = {
  longitude: number;
  latitude: number;
};

export type LocationNameReponse = {
  type: string;
  query: mapboxgl.LngLatLike;
  features: {
    id: string;
    type: string;
    place_type: string[];
    relevance: number;
    properties: {
      accuracy: string;
      mapbox_id: string;
    };
    text: string;
    place_name: string;
    center: number[];
    geometry: {
      type: string;
      coordinates: number[];
    };
    address: string;
    context: {
      id: string;
      mapbox_id: string;
      wikidata: string;
      text: string;
    }[];
  }[];
  attribution: string;
};

export const userLocationState = atom<UserLocation>({
  key: "userLocation",
  default: new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        resolve({
          latitude,
          longitude,
        });
      },
      () => {
        axios
          .get(`/api/get-location`)
          .then(({ data }: AxiosResponse<UserLocation>) => {
            resolve(data);
          })
          .catch((e: Error) => {
            reject(e.message);
          });
      },
      { enableHighAccuracy: true, timeout: 20000 }
    );
  }),
});

export const locationNameState = selector<string>({
  key: "locationName",
  get: async ({ get }) => {
    const { latitude, longitude } = get(userLocationState);
    return axios
      .get(
        `
      https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json
        ?access_token=${process.env.NEXT_PUBLIC_MAP_API_KEY}
        &types=address
    `.replaceAll(" ", "")
      )
      .then(({ data: { features } }: AxiosResponse<LocationNameReponse>) => {
        return features[0].place_name;
      })
      .catch((e: Error) => "");
  },
});
