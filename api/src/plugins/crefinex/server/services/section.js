module.exports = ({ strapi }) => ({
  async find(query) {
    return await strapi.entityService.findMany("plugin::crefinex.section", query);
  },
});
