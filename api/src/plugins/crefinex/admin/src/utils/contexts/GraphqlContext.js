import React, { createContext, useContext } from "react";
import { GraphQLClient } from "graphql-request";

const GraphQLContext = createContext();
const graphQLClient = new GraphQLClient(`http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/graphql`, {
  headers: {
    authorization: `${process.env.STRAPI_ADMIN_API_KEY}`,
  },
});

export const GraphQLProvider = ({ children }) => {
  return <GraphQLContext.Provider value={{ graphQLClient }}>{children}</GraphQLContext.Provider>;
};

export const useGraphQL = () => useContext(GraphQLContext);
