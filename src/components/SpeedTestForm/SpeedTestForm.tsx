"use client";

import { FC, MouseEventHandler, useState } from "react";
import formStyles from "./SpeedTestForm.module.scss";
import { FiChevronDown } from "react-icons/fi";
import { renderToString } from "react-dom/server";
import { Button } from "../Button/Button";
import { DownloadSize, useSpeedTest } from "@/hooks/useSpeedTest";
import { DeviceLookup } from "../DeviceLookup/DeviceLookup";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { deviceSelectedState } from "../DeviceLookup/DeviceLookup.states";
import { userLocationState } from "@/states/location";
import { refreshMarkersState } from "@/states/map";

export const SpeedTestForm: FC<{
  closeModal: () => unknown;
}> = ({ closeModal }) => {
  const { speed, progress, run, processing, stop, complete } = useSpeedTest();
  const setRefreshMap = useSetRecoilState(refreshMarkersState);
  const [network, setNetwork] = useState<string>("");
  const [submitingResult, setSubmittingResult] = useState<boolean>(false);
  const device = useRecoilValue(deviceSelectedState);
  const { latitude, longitude } = useRecoilValue(userLocationState);

  const buttonSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const size = e.currentTarget.value as DownloadSize;
    run(size);
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setSubmittingResult(true);
    axios
      .put("/api/results", {
        longitude,
        latitude,
        speed: parseFloat(speed),
        device,
        network,
      })
      .then(() => {
        setRefreshMap((i) => i + 1);
        closeModal();
      })
      .catch((error: AxiosError) => {
        alert(`Whoops! And error occurred: ${error.message}`);
      })
      .finally(() => {
        setSubmittingResult(false);
      });
  };

  return (
    <div className={formStyles.form}>
      {!processing && !complete ? (
        <div className={formStyles.panel}>
          <div>
            <label className="block" htmlFor="network">
              Network:
            </label>
            <select
              value={network}
              onChange={(e) => {
                setNetwork(e.currentTarget.value);
              }}
              id="network"
              name="network"
              required
              style={{
                backgroundImage: `url("data:image/svg+xml;base64,${btoa(
                  renderToString(FiChevronDown({ style: { opacity: 0.5 } }))
                )}")`,
              }}
            >
              <option value="" disabled selected={!network}>
                Select network
              </option>
              <option value="EE">EE</option>
              <option value="O2">O2</option>
              <option value="Three">Three</option>
              <option value="Vodaphone">Vodaphone</option>
            </select>
            <DeviceLookup className="my-3" />
            <p className="mt-5 mb-2">
              Click on one of the buttons below to run a speed test.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-grow"
                value="small"
                onClick={buttonSubmit}
                disabled={!network || device.length === 0}
              >
                Test (~13mb)
              </Button>
              <Button
                className="flex-grow"
                value="medium"
                onClick={buttonSubmit}
                disabled={!network || device.length === 0}
              >
                Test (~50mb)
              </Button>
              <Button
                className="flex-grow"
                value="large"
                onClick={buttonSubmit}
                disabled={!network || device.length === 0}
              >
                Test (~170mb)
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className={formStyles.panel}>
          <div className="text-center">
            <div className={formStyles.progressContainer}>
              <CircularProgressbarWithChildren
                value={progress}
                strokeWidth={5}
                styles={buildStyles({
                  strokeLinecap: "rounded",
                  pathTransitionDuration: 0.5,
                  pathColor: "currentColor",
                })}
              >
                <span className="flex flex-col items-center justify-center">
                  <span className="font-bold text-purple-500 text-4xl">
                    {speed}
                  </span>
                  <span className="text-sm">Mbps</span>
                </span>
              </CircularProgressbarWithChildren>
            </div>
            {!complete ? (
              <Button onClick={stop} className="mx-3">
                Stop
              </Button>
            ) : (
              <>
                <Button onClick={handleSubmit} loading={submitingResult}>
                  Submit Result
                </Button>
                <span
                  className="block mt-3 underline text-cyan-500 text-sm cursor-pointer"
                  onClick={() => {
                    stop();
                    run();
                  }}
                >
                  Restart Test
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
