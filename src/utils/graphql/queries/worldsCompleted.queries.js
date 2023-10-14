import { gql } from "graphql-request";

export const queryWorldsCompletedByUser = gql`
  query ($id: ID!, $start: Int, $limit: Int) {
    worldsCompletedByUser(id: $id, start: $start, limit: $limit) {
      worldsCompleted {
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
