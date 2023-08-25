module.exports = ({ strapi }) => ({
  async find(query) {
    return await strapi.entityService.findMany("api::module.module", {});
  },
});
