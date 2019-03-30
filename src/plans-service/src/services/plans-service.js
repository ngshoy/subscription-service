const Plan = require("../models/index")["Plan"];
const CachingService = require('./caching-service');

module.exports = class PlansService {
    constructor() {
        this.cachingService = new CachingService({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD
        });
    }

    async findAll(userId) {
        let plans = await this.cachingService.getPlans(userId);
        if (!plans) {
            plans = await Plan.findAll({where: {userId}});
            this.cachingService.storePlans(userId, plans);
        }
        return plans;
    }

    async findOne(id) {
        return await Plan.findOne({where: {id}});
    }

    async create(plan) {
        return await Plan.create(plan);
    }

    async deleteOne(id) {
        return await Plan.destroy({where: {id}});
    }
}