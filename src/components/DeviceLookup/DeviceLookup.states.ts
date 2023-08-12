"use client";

import { Timeout } from "@/types/common";
import { sleep } from "@/utils/helpers";
import axios from "axios";
import { atom, selector } from "recoil";

export const deviceQueryState = atom<string>({
  key: "device",
  default: "",
});

export const deviceSelectedState = atom<string>({
  key: "deviceSelected",
  default: "",
});

export const deviceSearchResultsState = selector<string[]>({
  key: "deviceSearchResults",
  get: async ({ get }) => {
    const device = get(deviceQueryState);
    const {
      data: { devices },
    } = await axios.get(`/api/get-device?query=${device}`);
    return devices as string[];
  },
});
