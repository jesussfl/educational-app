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
