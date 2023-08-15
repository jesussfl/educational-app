'use strict';

/**
 * exercise router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::exercise.exercise');
