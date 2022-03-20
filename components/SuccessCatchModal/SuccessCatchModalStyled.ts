import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const BoxStyled = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  background-color: #fff;
  border: 2px solid #fff;
  box-shadow: 24;
  border-radius: 10px;
  padding: 20px;
  @media (min-width: 600px) {
    width: 70%;
  }
  @media (min-width: 900px) {
    width: 50%;
  }
`;

export const ModalTitle = styled(Typography)`
  line-height: 1;
  text-align: center;
  @media (min-width: 600px) {
    text-align: left;
  }
`;

export const ModalDescription = styled(Typography)`
  margin: 15px 0;
  text-align: center;
  @media (min-width: 600px) {
    text-align: left;
  }
`;

export const ButtonCatch = styled(Button)`
  padding: 6px 15px;
  margin: 10px auto 0;
  display: block;
  @media (min-width: 600px) {
    margin: 0 0 0 10px;
    display: inline;
  }
`;

export const InputWrapper = styled.div`
  text-align: center;
  @media (min-width: 600px) {
    text-align: left;
  }
`;