import { GraphQLClient } from "graphql-request";
import { API_URL, STRAPI_API_KEY } from "@env";

const client = new GraphQLClient(`${API_URL}/graphql`, {
   headers: {
      authorization: `${STRAPI_API_KEY}`,
   },
});
// This function will be used to send queries via GraphQL

export const query = async (query, variables) => {
   return await client.request(query, variables);
};
