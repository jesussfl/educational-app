module.exports = {
  // ...
  crefinex: {
    enabled: true,
    resolve: "./src/plugins/crefinex",
  },
  graphql: {
    enabled: true,

    config: {
      playgroundAlways: false,
      defaultLimit: 10,
      maxLimit: 20,
      apolloServer: {
        tracing: true,
      },
      shadowCRUD: true,
    },
  },
  // ...
};
