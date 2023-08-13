import { PropsWithChildren } from "react";

export type ModalProps = PropsWithChildren<{
  title?: string;
  closeOnBlur?: boolean;
  onClose?: () => unknown;
}>;

export type ModalRefProps = {
  open: () => void;
  close: () => void;
};
