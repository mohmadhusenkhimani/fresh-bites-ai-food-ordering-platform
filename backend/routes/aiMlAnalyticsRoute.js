
const express = require("express");
const router = express.Router();

const {
    getOverview,
    getCustomerSegments,
    getRecommendations,
    getReviewSentiment,
    getDemandForecast,
    getReviewFoodSummary,
    getFoodWastePrediction,
} = require("../controllers/aiMlAnalyticsController");

router.get("/overview", getOverview);
router.get("/customer-segments", getCustomerSegments);
router.get("/recommendations", getRecommendations);
router.get("/review-sentiment", getReviewSentiment);
router.get("/demand-forecast", getDemandForecast);
router.get("/review-food-summary", getReviewFoodSummary);
router.get("/food-waste-prediction", getFoodWastePrediction);

module.exports = router;
