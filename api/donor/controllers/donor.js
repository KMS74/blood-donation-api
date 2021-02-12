"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  // Get donors/get
  async getDonors(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.donor.search(ctx.query);
    } else {
      entities = await strapi.services.donor.find(ctx.query);
    }

    return entities.map((entity) => {
      const donor = sanitizeEntity(entity, {
        model: strapi.models.donor,
      });
      if (donor.bloodbank) {
        delete donor.bloodbank;
      }
      if (donor.user) {
        delete donor.user;
      }
      return donor;
    });
  },
};
