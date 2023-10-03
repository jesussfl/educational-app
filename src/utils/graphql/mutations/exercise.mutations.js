import { gql } from "graphql-request";

export const createExerciseMutation = gql`
  mutation ($data: CrefinexExerciseInput!) {
    createCrefinexExercise(data: $data) {
      data {
        id
      }
    }
  }
`;

export const updateExerciseMutation = gql`
  mutation ($id: ID!, $data: CrefinexExerciseInput!) {
    updateExercise(id: $id, data: $data) {
      id
    }
  }
`;

export const deleteExerciseMutation = gql`
  mutation ($id: ID!) {
    deleteExercise(id: $id) {
      id
    }
  }
`;
