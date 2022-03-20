import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const DuplicateNicknameAlert = (props: Props) => {
  return (
    <Snackbar
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={props.open}
      onClose={props.handleClose}
    >
      <Alert severity="info">
        You already have pokemon that has same nickname with your input, please
        try again with another nickname!
      </Alert>
    </Snackbar>
  );
};

export default DuplicateNicknameAlert;
