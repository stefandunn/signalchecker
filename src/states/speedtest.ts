import { atom } from "recoil";

export const speedTestState = atom<{
  progress: number;
  complete: boolean;
  speed: number;
  processing: boolean;
}>({
  key: "speedTest",
  default: { progress: 0, complete: false, speed: 0, processing: false },
});
