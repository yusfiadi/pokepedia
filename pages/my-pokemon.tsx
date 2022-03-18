import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import styled from "@emotion/styled";

import AppBar from "../components/AppBar";
import PokemonCard from "../components/PokemonCard";

const ContainerStyled = styled(Container)`
  padding: 20px 0;
`;

const MyPokemonListPage: NextPage = () => {
  const [myPokemon, setMyPokemon] = useState<any>([]);

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
  };

  return (
    <>
      <AppBar />
      <ContainerStyled maxWidth={"md"}>
        <Grid container spacing={3}>
          {myPokemon.length > 0 &&
            myPokemon.map((pokemon: any, id: number) => {
              return (
                <Grid item xs={6} sm={4} key={id}>
                  {/* <PokemonCard pokemon={pokemon} /> */}
                  <h3>{pokemon.name}</h3>
                  <p>{pokemon.nickname}</p>
                  <button onClick={() => handleRelease(pokemon.nickname)}>
                    release
                  </button>
                </Grid>
              );
            })}
        </Grid>
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
