

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('crefinex')
      .service('myService')
      .getWelcomeMessage();
  },
});
