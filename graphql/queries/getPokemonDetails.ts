import { gql } from "@apollo/client";

export const GET_POKEMON_DETAILS = gql`
query pokemon($name: String!) {
  pokemon(name: $name) {
    id
    name
    sprites {
      front_default
      back_default
      back_female
    }
    moves {
      move {
        name
      }
    }
    types {
      type {
        name
      }
    }
  }
}
`;
