import { gql } from "graphql-request";

export const querySectionsCompletedByUser = gql`
  query ($id: ID!, $start: Int, $limit: Int) {
    sectionsCompletedByUser(id: $id, start: $start, limit: $limit) {
      sectionsCompleted {
        id
        attributes {
          section {
            data {
              id
            }
          }
        }
      }
    }
  }
`;
