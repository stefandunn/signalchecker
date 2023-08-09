"use client";

import { ClassName } from "@/types/props";
import { FC, MouseEventHandler, useRef } from "react";
import { Button } from "@/components/Button/Button";
import clsx from "clsx";
import { ModalRefProps } from "@/components/Modal/Modal.types";
import { SpeedTestModal } from "@/components/SpeedTestModal/SpeedTestModal";
import { useRecoilValueLoadable } from "recoil";
import { locationNameState } from "@/states/location";

export const SpeedTestButtons: FC<ClassName> = ({ className }) => {
  const { state } = useRecoilValueLoadable(locationNameState);
  const modalRef = useRef<ModalRefProps>(null);

  const openTestModal: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    modalRef.current?.open();
  };

  return (
    <>
      <div className={clsx(className, "mt-auto")}>
        <Button
          loading={state === "loading"}
          className="w-full"
          onClick={openTestModal}
        >
          Run Test
        </Button>
      </div>
      <SpeedTestModal title="Run a speed test" ref={modalRef}>
        Start a speed test!
      </SpeedTestModal>
    </>
  );
};
