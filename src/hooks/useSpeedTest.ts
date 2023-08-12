import { speedTestState } from "@/states/speedtest";
import axios, { AxiosError } from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";

export type DownloadSize = "small" | "medium" | "large";

export const useSpeedTest = () => {
  const [processing, setProcessing] = useState<boolean>(false);
  const speeds = useRef<number[]>([]);
  const [avgSpeed, setAvgSpeed] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const setSpeedTestData = useSetRecoilState(speedTestState);

  const controller = useRef<AbortController>();

  useEffect(() => {
    setSpeedTestData({
      processing,
      progress,
      speed: avgSpeed,
      complete: progress === 100,
    });
  }, [processing, avgSpeed, progress, setSpeedTestData]);

  const getDownloadDetails = (size: DownloadSize) => {
    switch (size) {
      case "large":
        return {
          size: 158008374,
          url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        };
      case "medium":
        return {
          size: 48051822,
          url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
        };
      default:
        return {
          size: 12917485,
          url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        };
    }
  };

  const run = (size: DownloadSize = "medium") => {
    controller.current = new AbortController();
    speeds.current = [];
    setAvgSpeed(0);
    setProgress(0);
    const downloadDetails = getDownloadDetails(size);
    let startTimeInterval = new Date().getTime();
    let totalDownloadedBytes = 0;
    setProcessing(true);
    axios
      .get(`${downloadDetails.url}?v=${startTimeInterval}`, {
        onDownloadProgress: ({ bytes }) => {
          const downloadedBytes = bytes;
          totalDownloadedBytes += downloadedBytes;
          const progress = (totalDownloadedBytes / downloadDetails.size) * 100;
          const newTime = new Date().getTime();
          const timeLapsed = (newTime - startTimeInterval) / 1000; // in seconds
          const speed = downloadedBytes / 1024 / 1024 / timeLapsed;
          startTimeInterval = newTime;
          speeds.current.push(speed);
          setAvgSpeed(() => {
            const totalSpeed = speeds.current.reduce((prev, cur) => prev + cur);
            return totalSpeed / speeds.current.length;
          });
          setProgress(Math.ceil(progress));
        },
        signal: controller.current.signal,
        responseType: "text",
        responseEncoding: "base64",
        timeout: 0,
      })
      .catch((e: AxiosError) => {
        if (e.message !== "canceled") {
          console.error(e.message);
        }
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  return {
    speed: avgSpeed.toFixed(1),
    progress,
    run,
    stop: () => {
      if (confirm("Are you sure?")) {
        controller.current?.abort();
      }
    },
    processing,
    complete: progress === 100,
  };
};
