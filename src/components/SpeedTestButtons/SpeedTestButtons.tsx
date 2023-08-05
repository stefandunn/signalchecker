"use client";

import { ClassName } from "@/types/props";
import { FC } from "react";
import { Button } from "../Button/Button";
import clsx from "clsx";

export const SpeedTestButtons: FC<ClassName> = ({ className }) => {
  return (
    <div className={clsx(className, "mt-auto")}>
      <Button className="w-full">Run Test</Button>
    </div>
  );
};
