import { ReactNode } from "react";

export interface IModalProps {
  children: ReactNode;
  textButton: string;
  open: boolean;
  buttonAction: () => void;
  handleClose: () => void;
}
