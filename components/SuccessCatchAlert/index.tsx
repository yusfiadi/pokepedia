import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const SuccessCatchAlert = (props: Props) => {
  return (
    <Snackbar
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={props.open}
      onClose={props.handleClose}
    >
      <Alert severity="success">You successfully catch the pokemon!</Alert>
    </Snackbar>
  );
};

export default SuccessCatchAlert;
