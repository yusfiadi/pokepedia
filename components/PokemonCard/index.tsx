import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import Typography from "@mui/material/Typography";

import * as Styled from "./PokemonCardStyled";

type PokemonCardProps = {
  pokemon: {
    name: string;
    url: string;
    dreamworld: string;
  };
};

const PokemonCard = (props: PokemonCardProps) => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt={props.pokemon.name}
        image={props.pokemon.dreamworld}
      />
      <CardContent>
        <Styled.PokemonName variant="h5">
          {props.pokemon.name}
        </Styled.PokemonName>
      </CardContent>
      <Divider />
      <Styled.CardActionsStyled>
        <Link href={`/details/${props.pokemon.name}`}>
          <Button variant="outlined" size="small">
            See Details
          </Button>
        </Link>
        <Styled.TotalOwned>1 owned</Styled.TotalOwned>
      </Styled.CardActionsStyled>
    </Card>
  );
};

export default PokemonCard;
