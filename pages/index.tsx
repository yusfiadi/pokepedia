import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import styled from "@emotion/styled";
import { GET_POKEMON_LIST } from "../graphql/queries/getPokemonList";

import AppBar from "../components/AppBar";
import PokemonCard from "../components/PokemonCard";
import client from "../apollo-client";

const ContainerStyled = styled(Container)`
  padding: 20px 0;
`;

type HomeProps = {
  pokemonList: {
    name: string;
    url: string;
    dreamworld: string;
  }[];
};

const Home: NextPage<HomeProps> = ({ pokemonList }) => {
  return (
    <>
      <AppBar />
      <ContainerStyled maxWidth={"md"}>
        <Grid container spacing={3}>
          {pokemonList.length > 0 &&
            pokemonList.map((pokemon: any, id: number) => {
              return (
                <Grid item xs={6} sm={4} key={id}>
                  <PokemonCard pokemon={pokemon} />
                </Grid>
              );
            })}
        </Grid>
      </ContainerStyled>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await client.query({
    query: GET_POKEMON_LIST,
    variables: {
      limit: 10,
      offset: 0,
    },
  });

  return {
    props: {
      pokemonList: data.pokemons.results,
    }, // will be passed to the page component as props
  };
};

export default Home;
