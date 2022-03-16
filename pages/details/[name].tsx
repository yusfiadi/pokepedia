import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { GetServerSideProps } from "next";

import Button from "@mui/material/Button";
import client from "../../apollo-client";
import { GET_POKEMON_DETAILS } from "../../graphql/queries/getPokemonDetails";

const DetailsPage: NextPage = () => {
  return <Button variant="contained">Details Page</Button>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await client.query({
    query: GET_POKEMON_DETAILS,
    variables: {
      name: context.query.name,
    },
  });
  
  return {
    props: {}, // will be passed to the page component as props
  };
};

export default DetailsPage;
