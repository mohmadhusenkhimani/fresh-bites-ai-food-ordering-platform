const express = require('express');
const router = express.Router();

const {
  getFoods,
  getFoodById,
  seedFoods,
  addFood,
  deleteFood,
  updateFood,
} = require('../controllers/foodController');

router.get('/', getFoods);

router.get('/:id', getFoodById);

router.post('/seed', seedFoods);

router.post('/', addFood);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

module.exports = router;