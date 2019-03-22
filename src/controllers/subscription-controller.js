const router = require('express').Router();
const asyncWrapper = require('../utils/async-wrapper').AsyncWrapper;
const SubscriptionsService = require("../services/subscriptions-service");

const subscriptionsService = new SubscriptionsService();

router.get('/', asyncWrapper(async (req, res) => {
  const userId = 1;
  const subscription = await subscriptionsService.findAll(userId);
  res.send(subscription);
}));

router.get('/:id', asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const userId = null;
  const plan = await subscriptionsService.findOne(id);
  res.send(plan);
}));

router.post('/', asyncWrapper(async (req, res) => {
  const plan = await subscriptionsService.create(req.body);
  res.send(plan);
}));

router.delete('/:id', asyncWrapper(async (req, res) => {
  const id = req.params.id;
  await subscriptionsService.deleteOne(id);
  res.sendStatus(200);
}));

module.exports = router;