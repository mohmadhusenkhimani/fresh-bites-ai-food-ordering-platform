const express = require("express");

const router = express.Router();

const {
  getAIInsights,
} = require("../controllers/aiInsightsController");

router.get("/", getAIInsights);

module.exports = router;