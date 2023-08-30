import { gql } from "graphql-request";

export const queryWorlds = gql`
  query {
    crefinexWorlds {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;
