
const AI_ML_SERVICE_URL = (
    process.env.AI_ML_SERVICE_URL || "http://127.0.0.1:8000"
).replace(/\/+$/, "");

const endpoints = {
    overview: "/api/analytics/overview",
    customerSegments: "/api/analytics/customer-segments",
    recommendations: "/api/analytics/recommendations",
    reviewSentiment: "/api/analytics/review-sentiment",
    demandForecast: "/api/analytics/demand-forecast",
    reviewFoodSummary: "/api/analytics/review-food-summary",
    foodWastePrediction: "/api/analytics/food-waste-prediction",
};

async function proxyAnalytics(req, res, endpoint) {
    try {
        const response = await fetch(`${AI_ML_SERVICE_URL}${endpoint}`, {
            method: "GET",
            signal: AbortSignal.timeout(15000),
            headers: { Accept: "application/json" },
        });

        const data = await response.json();

        return res.status(response.status).json(data);
    } catch (error) {
        console.error("AI/ML analytics service error:", error.message);

        return res.status(503).json({
            success: false,
            message:
                "AI/ML analytics service is unavailable. Check that the Python API is running.",
        });
    }
}

exports.getOverview = (req, res) =>
    proxyAnalytics(req, res, endpoints.overview);

exports.getCustomerSegments = (req, res) =>
    proxyAnalytics(req, res, endpoints.customerSegments);

exports.getRecommendations = (req, res) =>
    proxyAnalytics(req, res, endpoints.recommendations);

exports.getReviewSentiment = (req, res) =>
    proxyAnalytics(req, res, endpoints.reviewSentiment);

exports.getDemandForecast = (req, res) =>
    proxyAnalytics(req, res, endpoints.demandForecast);

exports.getReviewFoodSummary = (req, res) =>
    proxyAnalytics(req, res, endpoints.reviewFoodSummary);

exports.getFoodWastePrediction = (req, res) =>
    proxyAnalytics(req, res, endpoints.foodWastePrediction);
