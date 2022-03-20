import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import styled from "@emotion/styled";

import AppBar from "../components/AppBar";
import PokemonCard from "../components/PokemonCard";
import SuccessReleaseAlert from "../components/SuccessReleaseAlert";

const ContainerStyled = styled(Container)`
  padding: 20px 10px;
`;

const MyPokemonListPage: NextPage = () => {
  const [myPokemon, setMyPokemon] = useState<any>([]);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const handleOpenSuccessAlert = () => setOpenSuccessAlert(true);
  const handleCloseSuccessAlert = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessAlert(false);
  };

  useEffect(() => {
    setMyPokemon(
      JSON.parse(window.localStorage.getItem("my_pokemon_list") ?? "[]")
    );
  }, []);

  useEffect(() => {
    window.localStorage.setItem("my_pokemon_list", JSON.stringify(myPokemon));
  }, [myPokemon]);

  const handleRelease = (nickname: string) => {
    setMyPokemon(
      myPokemon.filter((pokemon: any) => pokemon.nickname !== nickname)
    );
    handleOpenSuccessAlert();
  };

  return (
    <>
      <AppBar />
      <ContainerStyled maxWidth={"md"}>
        <h4>My Pokemon List</h4>
        {myPokemon.length > 0 ? (
          <Grid container spacing={3}>
            {myPokemon.map((pokemon: any, id: number) => {
              return (
                <Grid item xs={6} sm={4} key={id}>
                  <PokemonCard
                    pokemon={pokemon}
                    cardType="my-pokemon"
                    handleRelease={() => handleRelease(pokemon.nickname)}
                  />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <p>I don&apos;t have any pokemon</p>
        )}
        <SuccessReleaseAlert
          open={openSuccessAlert}
          handleClose={handleCloseSuccessAlert}
        />
      </ContainerStyled>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

export default MyPokemonListPage;
