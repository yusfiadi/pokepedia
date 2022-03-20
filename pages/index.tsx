import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import styled from "@emotion/styled";
import { GetServerSideProps } from "next";
import { useLazyQuery } from "@apollo/client";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import InfiniteScroll from "react-infinite-scroll-component";
import { GET_POKEMON_LIST } from "../graphql/queries/getPokemonList";

import AppBar from "../components/AppBar";
import PokemonCard from "../components/PokemonCard";
import client from "../apollo-client";

const ContainerStyled = styled(Container)`
  padding: 20px 10px;
`;

type HomeProps = {
  initialPokemonList: {
    name: string;
    url: string;
    dreamworld: string;
  }[];
  totalCount: number;
};

const Home: NextPage<HomeProps> = ({ initialPokemonList, totalCount }) => {
  const [myPokemon, setMyPokemon] = useState<any>([]);
  const [pokemonList, setPokemonList] = useState(initialPokemonList);
  const [offsetQuery, setOffsetQuery] = useState(12); // because initial pokemon list have 10 item

  const [getNextPokemonList, { data }] = useLazyQuery(GET_POKEMON_LIST);

  const fetchNextPokemonList = () => {
    getNextPokemonList({ variables: { limit: 12, offset: offsetQuery } });
    setOffsetQuery((oldValue) => oldValue + 12);
  };

  useEffect(() => {
    if (data) {
      setPokemonList([...pokemonList, ...data.pokemons.results]);
    }
  }, [data]);

  useEffect(() => {
    setMyPokemon(
      JSON.parse(window.localStorage.getItem("my_pokemon_list") ?? "[]")
    );
  }, []);

  const countTotalPokemonOwned = (name: string) => {
    let count = myPokemon.filter(
      (myPokemon: any) => myPokemon.name === name
    ).length;

    return count;
  };

  return (
    <>
      <AppBar />
      <ContainerStyled maxWidth={"md"}>
        <h4>All Pokemon List</h4>
        <InfiniteScroll
          dataLength={pokemonList.length}
          next={fetchNextPokemonList}
          hasMore={pokemonList.length < totalCount - 12}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen all pokemons!</b>
            </p>
          }
        >
          <Grid container spacing={3}>
            {pokemonList.length > 0 &&
              pokemonList.map((pokemon: any, id: number) => {
                return (
                  <Grid item xs={6} sm={4} key={id}>
                    <PokemonCard
                      cardType="pokemon-list"
                      pokemon={pokemon}
                      count={countTotalPokemonOwned(pokemon.name)}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </InfiniteScroll>
      </ContainerStyled>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await client.query({
    query: GET_POKEMON_LIST,
    variables: {
      limit: 12,
      offset: 0,
    },
  });

  return {
    props: {
      initialPokemonList: data.pokemons.results,
      totalCount: data.pokemons.count,
    }, // will be passed to the page component as props
  };
};

export default Home;
