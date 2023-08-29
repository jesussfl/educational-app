import { gql } from "@apollo/client";

export function getLessonsBySection(id, start, limit) {
  return gql`
    query {
      lessonsBySection(id: ${id}, start: ${start}, limit: ${limit}) {
        lessons {
          id
          attributes {
            description
            order
            createdAt
            updatedAt
            publishedAt
            exercises {
              data {
                id
              }
            }
          }
        }
        pagination {
          total
        }
        section {
          description
          order
          world{
            data {
              attributes {
                name
              }
            }
          }
        }
      }
    }
  `;
}
