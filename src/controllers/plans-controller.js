const router = require('express').Router();
const asyncWrapper = require('../utils/async-wrapper').AsyncWrapper;
const PlansService = require("../services/plans-service");

const plansService = new PlansService();

router.get('/', asyncWrapper(async (req, res) => {
  const userId = null;
  const plans = await plansService.findAll(userId);
  res.send(plans);
}));

router.get('/:id', asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const userId = null;
  const plan = await plansService.findOne(id);
  res.send(plan);
}));

router.post('/', asyncWrapper(async (req, res) => {
  const plan = await plansService.create(req.body);
  res.send(plan);
}));

router.delete('/:id', asyncWrapper(async (req, res) => {
  const id = req.params.id;
  await plansService.deleteOne(id);
  res.sendStatus(200);
}));

module.exports = router;