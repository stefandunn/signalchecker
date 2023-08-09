"use client";

import { forwardRef } from "react";
import { Modal } from "../Modal/Modal";
import { ModalProps, ModalRefProps } from "../Modal/Modal.types";
import { SpeedTestForm } from "../SpeedTestForm/SpeedTestForm";

export const SpeedTestModal = forwardRef<ModalRefProps, ModalProps>(
  (props, ref) => (
    <Modal closeOnBlur={false} title="Run a speed test" {...props} ref={ref}>
      <SpeedTestForm />
    </Modal>
  )
);
SpeedTestModal.displayName = "SpeedTestModal";
