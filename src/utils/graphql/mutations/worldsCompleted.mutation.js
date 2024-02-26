import { gql } from "graphql-request";

export const createWorldCompletedMutation = gql`
  mutation ($user: ID!, $world: ID!, $data: CrefinexWorldCompletedInput!) {
    createOrUpdateCompletedWorld(user: $user, world: $world, data: $data) {
      id
    }
  }
`;
