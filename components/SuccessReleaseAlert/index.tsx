import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type Props = {
  open: boolean;
  handleClose: (e: any, r: any) => void;
};

const SuccessReleaseAlert = (props: Props) => {
  return (
    <Snackbar
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={props.open}
      onClose={props.handleClose}
    >
      <Alert severity="success">
        You successfully release the pokemon, go catch others!
      </Alert>
    </Snackbar>
  );
};

export default SuccessReleaseAlert;
