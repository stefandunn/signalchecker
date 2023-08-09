import { FC, HTMLAttributes, useEffect, useRef, useState } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { deviceSearchResultsState, deviceState } from "./DeviceLookup.states";
import { Timeout } from "@/types/common";
import { getResolvedValueOrElse } from "@/utils/helpers";
import deviceLookupStyles from "./DeviceLookup.module.scss";
import { HTMLDivElement } from "linkedom";
import clsx from "clsx";

export const DeviceLookup: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  const setDevice = useSetRecoilState(deviceState);
  const { state, contents: apiDevices } = useRecoilValueLoadable(
    deviceSearchResultsState
  );
  const [query, setQuery] = useState<string>("");
  const debouncer = useRef<Timeout>();
  const prevResults = useRef<string[] | undefined>();

  useEffect(() => {
    if (state === "hasValue") {
      prevResults.current = apiDevices;
    }
  }, [apiDevices, state]);

  const devices = getResolvedValueOrElse<string[]>(
    apiDevices,
    prevResults.current
  );

  useEffect(() => {
    if (debouncer.current) {
      clearTimeout(debouncer.current);
    }

    debouncer.current = setTimeout(() => {
      if (query.length > 2) {
        setDevice(query);
      }
    }, 600);
  }, [query, setDevice]);

  return (
    <div className={clsx(deviceLookupStyles.deviceLookup, className)}>
      <label className="block mt-3" htmlFor="device">
        Device:
      </label>
      <input
        value={query}
        onKeyUp={(e) => setQuery(e.currentTarget.value)}
        placeholder="Start typing (3 characters min.)"
        id="device"
      />
      {devices && (
        <ul className={deviceLookupStyles.deviceDropdown}>
          {devices.map((device) => (
            <li
              key={device}
              onClick={() => {
                setDevice(device);
                setQuery(device);
              }}
            >
              {device}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
