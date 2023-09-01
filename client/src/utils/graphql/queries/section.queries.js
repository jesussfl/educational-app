import { gql } from "graphql-request";

export const querySections = gql`
  query ($start: Int, $limit: Int) {
    sections(start: $start, limit: $limit) {
      data {
        id
        attributes {
          description
          order
          createdAt
          updatedAt
          publishedAt
          lessons {
            data {
              id
              attributes {
                description
                order
              }
            }
          }
          world {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
      meta {
        pagination {
          total
          pageCount
        }
      }
    }
  }
`;
