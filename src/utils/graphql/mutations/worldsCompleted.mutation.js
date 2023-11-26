import { gql } from "graphql-request";

export const createWorldCompletedMutation = gql`
  mutation ($data: CrefinexWorldCompletedInput!) {
    createCrefinexWorldCompleted(data: $data) {
      data {
        id
        attributes {
          world {
            data {
              id
            }
          }
        }
      }
    }
  }
`;
