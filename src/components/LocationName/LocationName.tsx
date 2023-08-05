"use client";

import { locationNameState } from "@/states/location";
import { FC, useEffect, useRef } from "react";
import { useRecoilValueLoadable } from "recoil";
import locationNameStyle from "./LocationName.module.scss";
import { getResolvedValueOrElse } from "@/utils/helpers";

export const LocationName: FC = () => {
  const { contents } = useRecoilValueLoadable(locationNameState);

  const addressPrevValue = useRef<string>();

  const address: string = getResolvedValueOrElse(
    contents,
    addressPrevValue.current
  );

  useEffect(() => {
    if (address) {
      addressPrevValue.current = address;
    }
  }, [address]);

  if (typeof address !== "string" && Object(contents).constructor === Promise) {
    return Array(4)
      .fill(0)
      .map((_, i) => (
        <span className="loading block mb-2 rounded-md" key={i}>
          &nbsp;
        </span>
      ));
  }

  const formattedAddress = `<span>${address
    .split(",")
    .map((line) => line.trim())
    .join("</span><span>")}</span>`;

  return (
    <h2
      className={locationNameStyle.locationName}
      dangerouslySetInnerHTML={{ __html: formattedAddress }}
    />
  );
};
