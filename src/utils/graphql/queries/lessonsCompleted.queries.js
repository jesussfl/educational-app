import { gql } from "graphql-request";

export const queryLessonsCompletedByUser = gql`
  query ($id: ID!, $start: Int, $limit: Int) {
    lessonsCompletedByUser(id: $id, start: $start, limit: $limit) {
      lessonsCompleted {
        id
        attributes {
          lesson {
            data {
              id
              attributes {
                section {
                  data {
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
            }
          }
        }
      }
    }
  }
`;
