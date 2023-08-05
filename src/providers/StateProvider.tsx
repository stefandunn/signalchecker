"use client";

import { FC, PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";

export const StateProvider: FC<PropsWithChildren> = ({ children }) => (
  <RecoilRoot>{children}</RecoilRoot>
);
