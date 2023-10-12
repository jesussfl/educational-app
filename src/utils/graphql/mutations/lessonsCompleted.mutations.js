import { gql } from "graphql-request";

export const createLessonCompletedMutation = gql`
  mutation ($data: CrefinexLessonCompletedInput!) {
    createCrefinexLessonCompleted(data: $data) {
      data {
        id
      }
    }
  }
`;
