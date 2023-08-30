import { gql } from "graphql-request";

export const createLessonMutation = gql`
  mutation ($data: CrefinexLessonInput!) {
    createLesson(data: $data) {
      id
    }
  }
`;

export const updateLessonMutation = gql`
  mutation ($id: ID!, $data: CrefinexLessonInput!) {
    updateLesson(id: $id, data: $data) {
      id
    }
  }
`;

export const deleteLessonMutation = gql`
  mutation ($id: ID!) {
    deleteLesson(id: $id) {
      id
    }
  }
`;
