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
			}
		}
	}
`;
