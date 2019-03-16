const router = require('express').Router;
const asyncWrapper = require('../utils/async-wrapper').AsyncWrapper;

router.get('/', asyncWrapper(async (req, res) => {

}));

router.get('/:id', asyncWrapper(async (req, res) => {

}));

router.post('/', asyncWrapper(async (req, res) => {

}));

router.delete('/:id', asyncWrapper(async (req, res) => {

}));

module.exports = router;