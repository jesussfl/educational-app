import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(`http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/graphql`, {
  headers: {
    authorization: `${process.env.STRAPI_ADMIN_API_KEY}`,
  },
});

// This function will be used to send queries via GraphQL

export const query = async (query, variables) => {
  return await client.request(query, variables);
};
