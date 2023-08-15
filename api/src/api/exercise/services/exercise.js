'use strict';

/**
 * exercise service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::exercise.exercise');
