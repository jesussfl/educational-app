import { gql } from "graphql-request";

export const queryWorlds = gql`
  query {
    crefinexWorlds {
      data {
        id
        attributes {
          name
          description
          order
          image {
            data {
              attributes {
                formats
                previewUrl
                url
              }
            }
          }
        }
      }
    }
  }
`;
