"use client";

import { forwardRef } from "react";
import { Modal } from "../Modal/Modal";
import { ModalProps, ModalRefProps } from "../Modal/Modal.types";
import { SpeedTestForm } from "../SpeedTestForm/SpeedTestForm";

export const SpeedTestModal = forwardRef<ModalRefProps, ModalProps>(
  (props, ref) => {
    const closeModal = () => {
      const {
        current: { close },
      } = ref as { current: ModalRefProps };
      close();
    };

    return (
      <Modal closeOnBlur={false} title="Run a speed test" {...props} ref={ref}>
        <SpeedTestForm closeModal={closeModal} />
      </Modal>
    );
  }
);
SpeedTestModal.displayName = "SpeedTestModal";
