import { gql } from "graphql-request";

export const createLessonMutation = gql`
  mutation ($data: CrefinexLessonInput!) {
    createCrefinexLesson(data: $data) {
      data {
        id
      }
    }
  }
`;

export const updateLessonMutation = gql`
  mutation ($id: ID!, $data: CrefinexLessonInput!) {
    updateCrefinexLesson(id: $id, data: $data) {
      data {
        id
      }
    }
  }
`;

export const deleteLessonMutation = gql`
  mutation ($id: ID!) {
    deleteCrefinexLesson(id: $id) {
      data {
        id
      }
    }
  }
`;
