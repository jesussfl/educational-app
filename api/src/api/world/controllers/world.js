'use strict';

/**
 * world controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::world.world');
