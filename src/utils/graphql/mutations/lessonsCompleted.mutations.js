import { gql } from "graphql-request";

export const createLessonCompletedMutation = gql`
  mutation ($user: ID!, $lesson: ID!, $data: CrefinexLessonCompletedInput!) {
    createOrUpdateCompletedLesson(user: $user, lesson: $lesson, data: $data) {
      id
    }
  }
`;
