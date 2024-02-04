import { gql } from "graphql-request";

export const createUserMutation = gql`
  mutation ($data: UsersPermissionsRegisterInput!) {
    register(input: $data) {
      jwt
      user {
        id
        email
        username
      }
    }
  }
`;
export const updateUserMutation = gql`
  mutation ($id: ID!, $data: UsersPermissionsUserInput!) {
    updateUsersPermissionsUser(id: $id, data: $data) {
      data {
        id
        attributes {
          username
          email
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

export const loginUserMutation = gql`
  mutation ($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        email
        username
        blocked
        currentWorld
        money
        lives
        streak_start_date
        streak_days
        last_completed_lesson_date
        next_life_regeneration
        expoPushToken
      }
    }
  }
`;

export const registerUserMutation = gql`
  mutation ($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
      user {
        id
        email
        username
        blocked
        currentWorld
        money
        lives
        streak_start_date
        streak_days
        last_completed_lesson_date
        next_life_regeneration
        expoPushToken
      }
    }
  }
`;
