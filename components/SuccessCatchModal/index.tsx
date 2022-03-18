import React from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import * as Styled from "./SuccessCatchModalStyled";

type Props = {
  open: boolean;
  handleClose: () => void;
  handleChange: (e: any) => void;
  nickname: string;
  handleSubmit: () => void;
};

const SuccessCatchModal = (props: Props) => {
  const handleOnClick = () => {
    props.handleSubmit();
    props.handleClose();
  };

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Styled.BoxStyled>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Congrats! You successfully catch this pokemon!
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Please give a nickname
        </Typography>
        <TextField
          id="outlined-basic"
          label="Nickname"
          variant="outlined"
          onChange={props.handleChange}
          value={props.nickname}
        />
        <Button
          variant="outlined"
          size="small"
          onClick={handleOnClick}
          disabled={props.nickname.length < 3}
        >
          Name it!
        </Button>
      </Styled.BoxStyled>
    </Modal>
  );
};

export default SuccessCatchModal;
