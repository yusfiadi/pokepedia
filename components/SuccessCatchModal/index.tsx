import React from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import * as Styled from "./SuccessCatchModalStyled";

type Props = {
  open: boolean;
  handleClose: () => void;
  handleChange: (e: any) => void;
  nickname: string;
  handleSubmit: () => void;
};

const SuccessCatchModal = (props: Props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Styled.BoxStyled>
        <Styled.ModalTitle id="modal-modal-title" variant="h6">
          Congrats! You successfully catch this pokemon!
        </Styled.ModalTitle>
        <Styled.ModalDescription id="modal-modal-description" sx={{ mt: 2 }}>
          Please give a nickname
        </Styled.ModalDescription>
        <Styled.InputWrapper>
          <TextField
            id="outlined-basic"
            label="Nickname"
            variant="outlined"
            size="small"
            onChange={props.handleChange}
            value={props.nickname}
          />
          <Styled.ButtonCatch
            variant="outlined"
            size="medium"
            onClick={props.handleSubmit}
            disabled={props.nickname.length < 3}
          >
            Name it!
          </Styled.ButtonCatch>
        </Styled.InputWrapper>
      </Styled.BoxStyled>
    </Modal>
  );
};

export default SuccessCatchModal;
