"use client";

import { FC, FormEventHandler, MouseEventHandler } from "react";
import formStyles from "./SpeedTestForm.module.scss";
import { FiChevronDown } from "react-icons/fi";
import { renderToString } from "react-dom/server";
import { Button } from "../Button/Button";
import { DownloadSize, useSpeedTest } from "@/hooks/useSpeedTest";
import { DeviceLookup } from "../DeviceLookup/DeviceLookup";

export const SpeedTestForm: FC = () => {
  const { speed, progress, run, processing, stop } = useSpeedTest();

  const buttonSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const size = e.currentTarget.value as DownloadSize;
    run(size);
  };

  return (
    <div className={formStyles.form}>
      <label className="block" htmlFor="network">
        Network:
      </label>
      <select
        id="network"
        name="network"
        required
        style={{
          backgroundImage: `url("data:image/svg+xml;base64,${btoa(
            renderToString(FiChevronDown({ style: { opacity: 0.5 } }))
          )}")`,
        }}
      >
        <option>EE</option>
        <option>O2</option>
        <option>Three</option>
        <option>Vodaphone</option>
      </select>
      <DeviceLookup className="my-3" />
      {!processing && (
        <>
          <p className="mt-5 mb-2">
            Click on one of the buttons below to run a speed test.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-grow" value="small" onClick={buttonSubmit}>
              Test (~13mb)
            </Button>
            <Button className="flex-grow" value="medium" onClick={buttonSubmit}>
              Test (~50mb)
            </Button>
            <Button className="flex-grow" value="large" onClick={buttonSubmit}>
              Test (~170mb)
            </Button>
          </div>
        </>
      )}
      {processing && (
        <div>
          <span>{speed}Mbps</span>
          <span>{progress}%</span>
          <Button onClick={stop}>Stop</Button>
        </div>
      )}
    </div>
  );
};
