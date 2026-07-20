// // // // const User = require("../models/User");
// // // // const Food = require("../models/Food");
// // // // const Order = require("../models/Order");

// // // // const getDashboardStats = async (req, res) => {
// // // //   try {
// // // //     const totalUsers = await User.countDocuments();
// // // //     const totalFoods = await Food.countDocuments();
// // // //     const totalOrders = await Order.countDocuments();

// // // //     const orders = await Order.find();

// // // //     let totalRevenue = 0;

// // // //     orders.forEach((order) => {
// // // //       totalRevenue += order.totalPrice || 0;
// // // //     });

// // // //     res.status(200).json({
// // // //       totalUsers,
// // // //       totalFoods,
// // // //       totalOrders,
// // // //       totalRevenue,
// // // //     });
// // // //   } catch (error) {
// // // //     console.log(error);
// // // //     res.status(500).json({
// // // //       success: false,
// // // //       message: "Dashboard Error",
// // // //     });
// // // //   }
// // // // };

// // // // module.exports = { getDashboardStats };
// // // const User = require("../models/User");
// // // const Food = require("../models/Food");
// // // const Order = require("../models/Order");

// // // const getDashboardStats = async (req, res) => {
// // //   try {
// // //     const totalUsers = await User.countDocuments();
// // //     const totalFoods = await Food.countDocuments();
// // //     const totalOrders = await Order.countDocuments();

// // //     const orders = await Order.find();

// // //     const totalRevenue = orders.reduce(
// // //       (sum, order) => sum + order.total,
// // //       0
// // //     );

// // //     res.status(200).json({
// // //       totalUsers,
// // //       totalFoods,
// // //       totalOrders,
// // //       totalRevenue,
// // //     });
// // //   } catch (error) {
// // //     console.error(error);

// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Error fetching dashboard data",
// // //     });
// // //   }
// // // };

// // // module.exports = {
// // //   getDashboardStats,
// // // };
// // const User = require("../models/User");
// // const Food = require("../models/Food");
// // const Order = require("../models/Order");

// // const getDashboardStats = async (req, res) => {
// //   try {
// //     const totalUsers = await User.countDocuments();
// //     const totalFoods = await Food.countDocuments();
// //     const totalOrders = await Order.countDocuments();

// //     const deliveredOrders = await Order.find({
// //       status: "delivered",
// //     });

// //     const totalRevenue = deliveredOrders.reduce(
// //       (sum, order) => sum + order.total,
// //       0
// //     );

// //     res.status(200).json({
// //       totalUsers,
// //       totalFoods,
// //       totalOrders,
// //       totalRevenue,
// //     });
// //   } catch (error) {
// //     console.error(error);

// //     res.status(500).json({
// //       success: false,
// //       message: "Error fetching dashboard data",
// //     });
// //   }
// // };

// // const getOrderStatusChart = async (req, res) => {
// //   try {
// //     const statusCounts = await Order.aggregate([
// //       {
// //         $group: {
// //           _id: "$status",
// //           count: { $sum: 1 },
// //         },
// //       },
// //     ]);

// //     res.status(200).json(statusCounts);
// //   } catch (error) {
// //     console.error(error);

// //     res.status(500).json({
// //       success: false,
// //       message: "Error fetching order status chart",
// //     });
// //   }
// // };

// // const getRevenueChart = async (req, res) => {
// //   try {
// //     const revenueData = await Order.aggregate([
// //       {
// //         $match: {
// //           status: "delivered",
// //         },
// //       },
// //       {
// //         $group: {
// //           _id: { $month: "$createdAt" },
// //           revenue: { $sum: "$total" },
// //         },
// //       },
// //       {
// //         $sort: {
// //           "_id": 1,
// //         },
// //       },
// //     ]);

// //     const months = [
// //       "Jan",
// //       "Feb",
// //       "Mar",
// //       "Apr",
// //       "May",
// //       "Jun",
// //       "Jul",
// //       "Aug",
// //       "Sep",
// //       "Oct",
// //       "Nov",
// //       "Dec",
// //     ];

// //     const formattedData = months.map((month, index) => {
// //       const found = revenueData.find(
// //         (item) => item._id === index + 1
// //       );

// //       return {
// //         month,
// //         revenue: found ? found.revenue : 0,
// //       };
// //     });

// //     res.status(200).json(formattedData);
// //   } catch (error) {
// //     console.error(error);

// //     res.status(500).json({
// //       success: false,
// //       message: "Error fetching revenue chart",
// //     });
// //   }
// // };

// // module.exports = {
// //   getDashboardStats,
// //   getOrderStatusChart,
// //   getRevenueChart,
// // };

// const User = require("../models/User");
// const Food = require("../models/Food");
// const Order = require("../models/Order");

// const getDashboardStats = async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     const totalFoods = await Food.countDocuments();
//     const totalOrders = await Order.countDocuments();

//     const deliveredOrders = await Order.find({
//       status: "delivered",
//     });

//     const totalRevenue = deliveredOrders.reduce(
//       (sum, order) => sum + order.total,
//       0
//     );

//     res.status(200).json({
//       totalUsers,
//       totalFoods,
//       totalOrders,
//       totalRevenue,
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: "Error fetching dashboard data",
//     });
//   }
// };

// const getOrderStatusChart = async (req, res) => {
//   try {
//     const statusCounts = await Order.aggregate([
//       {
//         $group: {
//           _id: "$status",
//           count: { $sum: 1 },
//         },
//       },
//     ]);

//     res.status(200).json(statusCounts);
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: "Error fetching order status chart",
//     });
//   }
// };

// const getRevenueChart = async (req, res) => {
//   try {
//     const revenueData = await Order.aggregate([
//       {
//         $match: {
//           status: "delivered",
//         },
//       },
//       {
//         $group: {
//           _id: { $month: "$createdAt" },
//           revenue: { $sum: "$total" },
//         },
//       },
//       {
//         $sort: {
//           _id: 1,
//         },
//       },
//     ]);

//     const months = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];

//     const formattedData = months.map((month, index) => {
//       const found = revenueData.find(
//         (item) => item._id === index + 1
//       );

//       return {
//         month,
//         revenue: found ? found.revenue : 0,
//       };
//     });

//     res.status(200).json(formattedData);
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: "Error fetching revenue chart",
//     });
//   }
// };

// const getTopSellingFoodsChart = async (req, res) => {
//   try {
//     const topFoods = await Order.aggregate([
//       {
//         $match: {
//           status: "delivered",
//         },
//       },
//       {
//         $unwind: "$items",
//       },
//       {
//         $group: {
//           _id: "$items.name",
//           totalSold: {
//             $sum: "$items.quantity",
//           },
//         },
//       },
//       {
//         $sort: {
//           totalSold: -1,
//         },
//       },
//       {
//         $limit: 5,
//       },
//     ]);

//     const formattedData = topFoods.map((food) => ({
//       name: food._id,
//       sold: food.totalSold,
//     }));

//     res.status(200).json(formattedData);
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: "Error fetching top selling foods",
//     });
//   }
// };

// module.exports = {
//   getDashboardStats,
//   getOrderStatusChart,
//   getRevenueChart,
//   getTopSellingFoodsChart,
// };

const User = require("../models/User");
const Food = require("../models/Food");
const Order = require("../models/Order");

const getDashboardStats = async (req, res) => {
try {
const totalUsers = await User.countDocuments();
const totalFoods = await Food.countDocuments();
const totalOrders = await Order.countDocuments();


const deliveredOrders = await Order.find({
  status: "delivered",
});

const totalRevenue = deliveredOrders.reduce(
  (sum, order) => sum + order.total,
  0
);

res.status(200).json({
  totalUsers,
  totalFoods,
  totalOrders,
  totalRevenue,
});


} catch (error) {
console.error(error);


res.status(500).json({
  success: false,
  message: "Error fetching dashboard data",
});


}
};

const getOrderStatusChart = async (req, res) => {
try {
const statusCounts = await Order.aggregate([
{
$group: {
_id: "$status",
count: { $sum: 1 },
},
},
]);


res.status(200).json(statusCounts);


} catch (error) {
res.status(500).json({
success: false,
message: "Error fetching order status chart",
});
}
};

const getRevenueChart = async (req, res) => {
try {
const revenueData = await Order.aggregate([
{
$match: {
status: "delivered",
},
},
{
$group: {
_id: { $month: "$createdAt" },
revenue: { $sum: "$total" },
},
},
{
$sort: {
_id: 1,
},
},
]);

const months = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

const formattedData = months.map((month, index) => {
  const found = revenueData.find(
    (item) => item._id === index + 1
  );

  return {
    month,
    revenue: found ? found.revenue : 0,
  };
});

res.status(200).json(formattedData);

} catch (error) {
res.status(500).json({
success: false,
message: "Error fetching revenue chart",
});
}
};

const getTopSellingFoodsChart = async (req, res) => {
try {
const topFoods = await Order.aggregate([
{
$match: {
status: "delivered",
},
},
{
$unwind: "$items",
},
{
$group: {
_id: "$items.name",
totalSold: {
$sum: "$items.quantity",
},
},
},
{
$sort: {
totalSold: -1,
},
},
{
$limit: 5,
},
]);

const formattedData = topFoods.map((food) => ({
  name: food._id,
  sold: food.totalSold,
}));

res.status(200).json(formattedData);


} catch (error) {
res.status(500).json({
success: false,
message: "Error fetching top selling foods",
});
}
};

const getFoodCategoryChart = async (req, res) => {
try {
const categories = await Food.aggregate([
{
$group: {
_id: "$category",
count: { $sum: 1 },
},
},
{
$sort: {
count: -1,
},
},
]);


const formattedData = categories.map((item) => ({
  name: item._id,
  value: item.count,
}));

res.status(200).json(formattedData);


} catch (error) {
res.status(500).json({
success: false,
message: "Error fetching food category chart",
});
}
};

module.exports = {
getDashboardStats,
getOrderStatusChart,
getRevenueChart,
getTopSellingFoodsChart,
getFoodCategoryChart,
};
