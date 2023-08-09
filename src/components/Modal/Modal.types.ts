import { PropsWithChildren } from "react";

export type ModalProps = PropsWithChildren<{
  title?: string;
  closeOnBlur?: boolean;
}>;

export type ModalRefProps = {
  open: () => void;
  close: () => void;
};
