module.exports = {
  async find(ctx) {
    try {
      return await strapi.plugin("crefinex").service("section").find(ctx.query);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
