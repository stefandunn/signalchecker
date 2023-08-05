"use client";

import { FC } from "react";
import { LocationName } from "@/components/LocationName/LocationName";
import { ClassName } from "@/types/props";
import clsx from "clsx";
import { SpeedTestButtons } from "@/components/SpeedTestButtons/SpeedTestButtons";

export const Sidebar: FC<ClassName> = ({ className }) => {
  return (
    <aside
      className={clsx(
        className,
        "p-5 w-[50vw] max-w-[250px] flex flex-col items-stretch"
      )}
    >
      <h1 className="font-light text-4xl mb-5 text-cyan-500">Signal Checker</h1>
      <LocationName />
      <SpeedTestButtons />
    </aside>
  );
};
