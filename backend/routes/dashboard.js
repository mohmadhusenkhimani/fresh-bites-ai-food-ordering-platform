// // // // const express = require("express");
// // // // const router = express.Router();

// // // // const {
// // // //   getDashboardStats,
// // // // } = require("../controllers/dashboardController");

// // // // router.get("/", getDashboardStats);

// // // // module.exports = router;
// // // const express = require("express");
// // // const router = express.Router();

// // // const {
// // //   getDashboardStats,
// // // } = require("../controllers/dashboardController");

// // // router.get("/", getDashboardStats);

// // // module.exports = router;
// // const express = require("express");
// // const router = express.Router();

// // const {
// //   getDashboardStats,
// //   getOrderStatusChart,
// //   getRevenueChart,
// // } = require("../controllers/dashboardController");

// // router.get("/", getDashboardStats);
// // router.get("/order-status-chart", getOrderStatusChart);
// // router.get("/revenue-chart", getRevenueChart);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();

// const {
//   getDashboardStats,
//   getOrderStatusChart,
//   getRevenueChart,
//   getTopSellingFoodsChart,
// } = require("../controllers/dashboardController");

// router.get("/", getDashboardStats);

// router.get(
//   "/order-status-chart",
//   getOrderStatusChart
// );

// router.get(
//   "/revenue-chart",
//   getRevenueChart
// );

// router.get(
//   "/top-selling-foods",
//   getTopSellingFoodsChart
// );

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
getDashboardStats,
getOrderStatusChart,
getRevenueChart,
getTopSellingFoodsChart,
getFoodCategoryChart,
} = require("../controllers/dashboardController");

router.get("/", getDashboardStats);

router.get(
"/order-status-chart",
getOrderStatusChart
);

router.get(
"/revenue-chart",
getRevenueChart
);

router.get(
"/top-selling-foods",
getTopSellingFoodsChart
);

router.get(
"/food-category-chart",
getFoodCategoryChart
);

module.exports = router;
