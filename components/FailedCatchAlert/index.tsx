import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const FailedCatchAlert = (props: Props) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={props.open}
      onClose={props.handleClose}
    >
      <Alert severity="warning">
        You failed catch the pokemon, please try again!
      </Alert>
    </Snackbar>
  );
};

export default FailedCatchAlert;
