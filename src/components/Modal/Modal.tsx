import { FC } from "react";
import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { IModalProps } from "./Modal.props";

import "./style.css";

export const ModalComponent: FC<IModalProps> = ({
  children,
  textButton,
  open,
  buttonAction,
  handleClose,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box className="boxContainer">
        {children}
        <Button
          variant="contained"
          onClick={() => {
            buttonAction();
          }}
        >
          {textButton || "Continuar"}
        </Button>
      </Box>
    </Modal>
  );
};
