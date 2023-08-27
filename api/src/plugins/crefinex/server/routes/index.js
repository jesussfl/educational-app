module.exports = [
  {
    method: "GET",
    path: "/",
    handler: "myController.index",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/sections",
    handler: "section.find",
    config: {
      policies: [],
      auth: false,
    },
  },
];
