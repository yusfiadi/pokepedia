import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";

import AppBar from "../../components/AppBar";
import client from "../../apollo-client";
import { GET_POKEMON_DETAILS } from "../../graphql/queries/getPokemonDetails";
import SuccessCatchModal from "../../components/SuccessCatchModal";
import FailedCatchAlert from "../../components/FailedCatchAlert";

const ContainerStyled = styled(Container)`
  padding: 20px 0;
`;

type DetailsProps = {
  pokemon: {
    id: number;
    name: string;
    sprites: {
      front_default: string;
      back_default: string;
      back_female: string;
    };
    moves: {
      move: {
        name: string;
      };
    };
    types: {
      type: {
        name: string;
      };
    };
  };
};

const DetailsPage: NextPage<DetailsProps> = ({ pokemon }) => {
  const [myPokemon, setMyPokemon] = useState<any>([]);
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setNickname("");
  };

  const [openAlert, setOpenAlert] = useState(false);
  const handleOpenAlert = () => setOpenAlert(true);
  const handleCloseAlert = () => setOpenAlert(false);

  useEffect(() => {
    setMyPokemon(
      JSON.parse(window.localStorage.getItem("my_pokemon_list") ?? "[]")
    );
  }, []);

  useEffect(() => {
    window.localStorage.setItem("my_pokemon_list", JSON.stringify(myPokemon));
  }, [myPokemon]);

  const catchProbability = (percentage: number) => {
    return Math.random() < percentage;
  };

  const catchPokemon = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (catchProbability(0.5)) {
        handleOpenModal();
      } else {
        handleOpenAlert();
      }
    }, 1000);
  };

  const handleChangeNickname = (event: any) => {
    setNickname(event.target.value);
  };

  const handleSubmit = (data: any) => {
    if (
      typeof myPokemon.find((pokemon: any) => pokemon.nickname === nickname) ===
      "undefined"
    ) {
      setMyPokemon([
        ...myPokemon,
        {
          id: data.id,
          nickname: nickname,
          name: data.name,
          sprites: data.sprites,
          moves: data.moves,
          types: data.types,
        },
      ]);
    }
  };

  return (
    <>
      <AppBar />
      <ContainerStyled maxWidth={"md"}>
        <Box>
          <Typography variant="h5">{pokemon.name}</Typography>
          {isLoading ? (
            <LoadingButton
              size="small"
              loading={isLoading}
              variant="outlined"
              disabled
            >
              loading
            </LoadingButton>
          ) : (
            <Button variant="outlined" size="small" onClick={catchPokemon}>
              Catch it!
            </Button>
          )}
          <SuccessCatchModal
            open={openModal}
            nickname={nickname}
            handleChange={handleChangeNickname}
            handleClose={handleCloseModal}
            handleSubmit={() => handleSubmit(pokemon)}
          />
          <FailedCatchAlert open={openAlert} handleClose={handleCloseAlert} />
        </Box>
      </ContainerStyled>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await client.query({
    query: GET_POKEMON_DETAILS,
    variables: {
      name: context.query.name,
    },
  });

  return {
    props: {
      pokemon: data.pokemon,
    }, // will be passed to the page component as props
  };
};

export default DetailsPage;
