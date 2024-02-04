import { GraphQLClient } from "graphql-request";
const createFetchWithTimeout = (timeout) => async (input, init) => {
  if (init.signal) {
    throw new Error("it looks like graphql-request started using AbortSignal on its own. Please check graphql-request's recent updates");
  }

  const controller = new AbortController();

  const timerId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timerId);
  }
};
const client = new GraphQLClient(`${process.env.EXPO_PUBLIC_API_URL}/graphql`, {
  headers: {
    authorization: `${process.env.EXPO_PUBLIC_STRAPI_API_KEY}`,
  },
  errorPolicy: "all",
  fetch: createFetchWithTimeout(30000),
});
// This function will be used to send queries via GraphQL

export const query = async (query, variables) => {
  const response = await client.request(query, variables);
  return response;
};
