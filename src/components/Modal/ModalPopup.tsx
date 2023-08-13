"use client";

import { FC, MouseEventHandler, useEffect, useRef, useState } from "react";
import { ModalProps, ModalRefProps } from "./Modal.types";
import modalStyle from "./Modal.module.scss";
import clsx from "clsx";
import { IoCloseOutline } from "react-icons/io5";

export const ModalPopup: FC<ModalProps & ModalRefProps> = ({
  close,
  children,
  title,
  onClose,
  closeOnBlur = true,
}) => {
  const [show, setShow] = useState<boolean>(true);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  const handleCloseButton: MouseEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    setShow(false);
    close();
    if (typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <dialog open={show} className={clsx(modalStyle.modal)}>
      <div
        className={modalStyle.modalBg}
        onClick={(e) => {
          if (closeOnBlur) {
            handleCloseButton(e);
          }
        }}
      />
      <div className={modalStyle.modalContainer}>
        <button
          ref={closeBtnRef}
          className={modalStyle.modalCloseBtn}
          onClick={handleCloseButton}
        >
          <IoCloseOutline className="text-3xl" />
        </button>
        {title && <span className={modalStyle.modalTitle}>{title}</span>}
        <div className={modalStyle.modalContent}>{children}</div>
      </div>
    </dialog>
  );
};
