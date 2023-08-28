const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("plugin::crefinex.section", {
  config: {
    find: {
      auth: false,
    },
  },
});
