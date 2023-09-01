import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(`http://192.168.0.108:1337/graphql`, {
	headers: {
		authorization: `bearer ffb7fdc751e3cce82ccc77f84129e14a7364b1dd3cb96f89e416bfc02f7da03156b2f699825bea1b968c00498a1079629bbd4bd64042d77a929ac7b47206cd6bfdd81985839cd916f5c2965254c45f9ec61d0d208fe31baaac4de5a6a5f6b0380b77388f75cecb41ed68c2287ee05a098cc4fd23de4269d15283d9f908c76f53`,
	},
});

// This function will be used to send queries via GraphQL

export const query = async (query, variables) => {
	return await client.request(query, variables);
};
