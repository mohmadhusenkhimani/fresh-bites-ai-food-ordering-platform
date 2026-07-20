const express = require("express");

const router = express.Router();

const {
    reviewSummary
} = require("../controllers/reviewAIController");


router.get(
    "/summary/:id",
    reviewSummary
);


module.exports = router;