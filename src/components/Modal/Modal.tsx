"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ModalProps, ModalRefProps } from "./Modal.types";
import { Timeout } from "@/types/common";
import { createPortal } from "react-dom";
import { ModalPopup } from "./ModalPopup";

export const Modal = forwardRef<ModalRefProps, ModalProps>((props, ref) => {
  const [show, setShow] = useState<boolean>(false);
  const [internalShow, setInternalShow] = useState<boolean>(false);
  const mounted = useRef<boolean>(true);
  const internalShowTimeout = useRef<Timeout>();

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (mounted.current) {
      internalShowTimeout.current = setTimeout(
        () => {
          setInternalShow(show);
        },
        show ? 0 : 300
      );
    }

    return () => {
      if (internalShowTimeout.current) {
        clearTimeout(internalShowTimeout.current);
      }
    };
  }, [show]);

  const close = () => {
    setShow(false);
    const { onClose } = props;
    if (typeof onClose === "function") {
      onClose();
    }
  };
  const open = () => setShow(true);

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  if (!internalShow) {
    return null;
  }

  return createPortal(
    <ModalPopup {...{ ...props, ...{ open, close } }} />,
    document.body
  );
});

Modal.displayName = "Modal";
