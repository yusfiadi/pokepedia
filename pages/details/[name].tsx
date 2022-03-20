import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";

import AppBar from "../../components/AppBar";
import client from "../../apollo-client";
import { GET_POKEMON_DETAILS } from "../../graphql/queries/getPokemonDetails";
import SuccessCatchModal from "../../components/SuccessCatchModal";
import FailedCatchAlert from "../../components/FailedCatchAlert";
import DuplicateNicknameAlert from "../../components/DuplicateNicknameAlert";
import SuccessCatchAlert from "../../components/SuccessCatchAlert";

const ContainerStyled = styled(Container)`
  padding: 20px 10px;
`;

const ListStyled = styled.ul`
  margin: 0;
`;

const CardActionsStyled = styled(CardActions)`
  padding: 16px;
`;

const ButtonActions = styled(Button)`
  font-size: 12px;
  width: 100%;

  @media (min-width: 600px) {
    font-size: 14px;
    width: auto;
  }
`;

const ButtonLoading = styled(LoadingButton)`
  font-size: 12px;
  width: 100%;

  @media (min-width: 600px) {
    font-size: 14px;
    width: auto;
  }
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
    }[];
    types: {
      type: {
        name: string;
      };
    }[];
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

  const [openFailedAlert, setOpenFailedAlert] = useState(false);
  const handleOpenFailedAlert = () => setOpenFailedAlert(true);
  const handleCloseFailedAlert = () => setOpenFailedAlert(false);

  const [openInfoAlert, setOpenInfoAlert] = useState(false);
  const handleOpenInfoAlert = () => setOpenInfoAlert(true);
  const handleCloseInfoAlert = () => setOpenInfoAlert(false);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const handleOpenSuccessAlert = () => setOpenSuccessAlert(true);
  const handleCloseSuccessAlert = () => setOpenSuccessAlert(false);

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
        handleOpenFailedAlert();
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
      handleCloseModal();
      handleOpenSuccessAlert();
    } else {
      handleOpenInfoAlert();
    }
  };

  return (
    <>
      <AppBar />
      <ContainerStyled maxWidth={"xs"}>
        <Box>
          <Card>
            <CardMedia
              style={{ padding: "20px" }}
              component="img"
              alt={pokemon.name}
              image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            />
            <CardContent>
              <h3>{pokemon.name}</h3>
              {pokemon.moves.length > 0 && (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Moves</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ListStyled>
                      {pokemon.moves.map((move: any, id: number) => {
                        return <li key={id}>{move.move.name}</li>;
                      })}
                    </ListStyled>
                  </AccordionDetails>
                </Accordion>
              )}

              {pokemon.types.length > 0 && (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Types</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ListStyled>
                      {pokemon.types.map((type: any, id: number) => {
                        return <li key={id}>{type.type.name}</li>;
                      })}
                    </ListStyled>
                  </AccordionDetails>
                </Accordion>
              )}
            </CardContent>
            <Divider />
            <CardActionsStyled>
              {isLoading ? (
                <ButtonLoading
                  size="small"
                  loading={isLoading}
                  variant="outlined"
                  disabled
                >
                  loading
                </ButtonLoading>
              ) : (
                <ButtonActions
                  variant="outlined"
                  size="small"
                  onClick={catchPokemon}
                >
                  Catch it!
                </ButtonActions>
              )}
            </CardActionsStyled>
          </Card>
          <SuccessCatchModal
            open={openModal}
            nickname={nickname}
            handleChange={handleChangeNickname}
            handleClose={handleCloseModal}
            handleSubmit={() => handleSubmit(pokemon)}
          />
          <FailedCatchAlert
            open={openFailedAlert}
            handleClose={handleCloseFailedAlert}
          />
          <DuplicateNicknameAlert
            open={openInfoAlert}
            handleClose={handleCloseInfoAlert}
          />
          <SuccessCatchAlert
            open={openSuccessAlert}
            handleClose={handleCloseSuccessAlert}
          />
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
