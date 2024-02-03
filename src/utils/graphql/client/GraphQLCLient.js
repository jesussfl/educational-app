import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(`${process.env.EXPO_PUBLIC_API_URL}/graphql`, {
  headers: {
    authorization: `${process.env.EXPO_PUBLIC_STRAPI_API_KEY}`,
  },
});
// This function will be used to send queries via GraphQL

export const query = async (query, variables) => {
  return await client.request(query, variables);
};
