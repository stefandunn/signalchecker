import {
  ChangeEvent,
  FC,
  HTMLAttributes,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import {
  deviceSearchResultsState,
  deviceQueryState,
  deviceSelectedState,
} from "./DeviceLookup.states";
import { Timeout } from "@/types/common";
import { getResolvedValueOrElse } from "@/utils/helpers";
import deviceLookupStyles from "./DeviceLookup.module.scss";
import { HTMLDivElement } from "linkedom";
import clsx from "clsx";

export const DeviceLookup: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  const { state, contents: apiDevices } = useRecoilValueLoadable(
    deviceSearchResultsState
  );
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const setDevice = useSetRecoilState(deviceQueryState);
  const setSelectedDevice = useSetRecoilState(deviceSelectedState);
  const [inputVal, setInputVal] = useState<string>("");
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

  const handleInput = (
    e: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>
  ) => {
    const { value } = e.target as HTMLInputElement;
    setInputVal(value);
    if (e.type === "change") {
      setSelectedDevice("");
    }
    if (debouncer.current) {
      clearTimeout(debouncer.current);
    }

    debouncer.current = setTimeout(() => {
      setDevice(value);
    }, 600);
  };

  useEffect(() => {
    const handleDropdownBlur = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#device-lookup")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleDropdownBlur);

    return () => {
      document.removeEventListener("click", handleDropdownBlur);
    };
  }, []);

  return (
    <div className={clsx(className)} id="device-lookup">
      <label className="block mt-3" htmlFor="device">
        Device:
      </label>
      <input
        value={inputVal}
        onFocus={() => setShowDropdown(true)}
        onChange={handleInput}
        onKeyUp={handleInput}
        placeholder="Start typing (3 characters min.)"
        id="device"
      />
      {devices && (
        <ul
          className={clsx(
            deviceLookupStyles.deviceDropdown,
            showDropdown && deviceLookupStyles.deviceDropdownShown
          )}
        >
          {devices.map((device) => (
            <li
              key={device}
              onClick={() => {
                setShowDropdown(false);
                setSelectedDevice(device);
                setInputVal(device);
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
