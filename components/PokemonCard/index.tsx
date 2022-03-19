import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Link from "next/link";

import * as Styled from "./PokemonCardStyled";

type PokemonCardProps = {
  cardType: "pokemon-list" | "my-pokemon";
  pokemon: {
    id: number;
    name: string;
    url?: string;
    artwork?: string;
    nickname?: string;
  };
  count?: () => void;
  handleRelease?: () => void;
};

const PokemonCard = (props: PokemonCardProps) => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt={props.pokemon.name}
        image={
          props.pokemon.artwork ??
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.pokemon.id}.png`
        }
      />
      <CardContent>
        <Styled.PokemonName variant="h5">
          {props.pokemon.name}
          <Styled.TotalOwned>
            {props.cardType === "pokemon-list"
              ? `(${props.count})`
              : `(${props.pokemon.nickname})`}
          </Styled.TotalOwned>
        </Styled.PokemonName>
      </CardContent>
      <Divider />
      <Styled.CardActionsStyled>
        {props.cardType === "pokemon-list" && (
          <Link href={`/details/${props.pokemon.name}`}>
            <Styled.ButtonActions variant="outlined" size="small">
              See Details
            </Styled.ButtonActions>
          </Link>
        )}
        {props.cardType === "my-pokemon" && (
          <Styled.ButtonActions
            variant="text"
            color="error"
            size="small"
            onClick={props.handleRelease}
          >
            Release
          </Styled.ButtonActions>
        )}
      </Styled.CardActionsStyled>
    </Card>
  );
};

export default PokemonCard;
