import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import CardActions from "@mui/material/CardActions";

export const PokemonName = styled(Typography)`
  line-height: 1;
  font-size: 16px;
  text-align: center;

  @media (min-width: 600px) {
    font-size: 20px;
    text-align: left;
  }
`;

export const CardActionsStyled = styled(CardActions)`
  padding: 16px;
`;

export const ButtonActions = styled(Button)`
  font-size: 12px;
  width: 100%;

  @media (min-width: 600px) {
    font-size: 14px;
    width: auto;
  }
`;

export const TotalOwned = styled.span`
  font-size: 12px;
  margin-left: 10px;
  @media (min-width: 600px) {
    font-size: 14px;
  }
`;