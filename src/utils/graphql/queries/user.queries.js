import { gql } from "graphql-request";

export const queryUser = gql`
  query ($id: ID!) {
    usersPermissionsUser(id: $id) {
      data {
        id
        attributes {
          email
          username
          blocked
          currentWorld
          money
          lives
          streak_start_date
          streak_days
          last_completed_lesson_date
          registration_date
          next_life_regeneration
          expoPushToken
        }
      }
    }
  }
`;
