'use strict';

/**
 * exercise controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::exercise.exercise');
