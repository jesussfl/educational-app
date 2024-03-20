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
          money
          lives
          streak_start_date
          streak_days
          last_completed_lesson_date
          registration_date
          next_life_regeneration
          first_life_lost_date
          streak_shields
          current_world {
            data {
              id
              attributes {
                name
                description
                order
              }
            }
          }
        }
      }
    }
  }
`;
