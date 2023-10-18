import { gql } from "graphql-request";

export const createLessonCompletedMutation = gql`
  mutation ($user: ID!, $lesson: ID!, $data: CrefinexLessonCompletedInput!) {
    createOrUpdateLessonCompleted(user: $user, lesson: $lesson, data: $data) {
      data {
        id
      }
    }
  }
`;
