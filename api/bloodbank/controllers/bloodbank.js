'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    // Get bloodbanks/get
    async getBloodBanks(ctx) {
        let entities;
    if (ctx.query._q) {
      entities = await strapi.services.bloodbank.search(ctx.query);
    } else {
      entities = await strapi.services.bloodbank.find(ctx.query);
    }

    return entities.map(entity => {
      const bloodbank = sanitizeEntity(entity, {
        model: strapi.models.bloodbank,
      });
      if (bloodbank.admins && bloodbank.donors) {
        delete bloodbank.admins;
        delete bloodbank.donors;
      }
      return bloodbank;
    });

    }
};
