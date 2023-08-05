import { FC, PropsWithChildren } from "react";
import { StateProvider } from "./StateProvider";

export const AllProviders: FC<PropsWithChildren> = ({ children }) => (
  <StateProvider>{children}</StateProvider>
);
