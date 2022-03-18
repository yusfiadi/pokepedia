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


const DetailsPage: NextPage = () => {
  return <Button variant="contained">Details Page</Button>;
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
