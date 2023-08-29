export const GET_ALL_SECTIONS = gql`
  query {
    crefinexSections {
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
            }
          }
        }
      }
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
    }
  }
`;
