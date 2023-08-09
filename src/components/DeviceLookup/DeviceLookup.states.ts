"use client";

import axios, { AxiosResponse } from "axios";
import { atom, selector } from "recoil";

export const deviceState = atom<string>({
  key: "device",
  default: "",
});

export const deviceSearchResultsState = selector<string[]>({
  key: "deviceSearchResults",
  get: async ({ get }) => {
    const device = get(deviceState);

    const {
      data: { devices },
    } = await axios.get(`/api/get-device?query=${device}`);
    return devices as string[];
  },
});
