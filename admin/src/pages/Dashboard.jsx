// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// import AdminLayout from "../components/AdminLayout";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
// } from "recharts";

// const COLORS = [
//   "#EF4444",
//   "#F97316",
//   "#F59E0B",
//   "#10B981",
//   "#3B82F6",
//   "#8B5CF6",
// ];

// function Dashboard() {
//   const navigate = useNavigate();

//   const [aiInsights, setAiInsights] = useState("");
//   const [recentOrders, setRecentOrders] = useState([]);
//   const [statusData, setStatusData] = useState([]);
//   const [revenueData, setRevenueData] = useState([]);
//   const [topFoodsData, setTopFoodsData] = useState([]);

//   const [stats, setStats] = useState({
//     totalOrders: 0,
//     totalUsers: 0,
//     totalRevenue: 0,
//   });

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//  useEffect(() => {
//   fetchDashboardData();
//   fetchRecentOrders();
//   fetchOrderStatusChart();
//   fetchRevenueChart();
//   fetchTopFoodsChart();
//   fetchAIInsights();
// }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/dashboard"
//       );

//       setStats(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
// const fetchRecentOrders = async () => {
//   try {
//     const response = await axios.get(
//       "http://localhost:5000/api/orders/recent"
//     );

//     setRecentOrders(response.data.orders || []);
//   } catch (error) {
//     console.error(error);
//     setRecentOrders([]);
//   }
// };

//   const fetchOrderStatusChart = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/dashboard/order-status-chart"
//       );

//       const formatted = response.data.map((item) => ({
//         name: item._id,
//         value: item.count,
//       }));

//       setStatusData(formatted);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchRevenueChart = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/dashboard/revenue-chart"
//       );

//       setRevenueData(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchTopFoodsChart = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/dashboard/top-selling-foods"
//       );

//       setTopFoodsData(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchAIInsights = async () => {
//   try {
//     const response = await axios.get(
//       "http://localhost:5000/api/admin/ai-insights"
//     );

//     setAiInsights(response.data.insights);
//   } catch (error) {
//     console.error("AI Insights Error:", error);
//   }
// };

//   return (
//     <AdminLayout title="Dashboard">
//       {/* Logout */}
//       <div className="flex justify-end mb-6">
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
//           <p className="text-gray-500 font-medium">
//             Total Orders
//           </p>

//           <h2 className="text-4xl font-bold text-red-500 mt-3">
//             {stats.totalOrders}
//           </h2>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
//           <p className="text-gray-500 font-medium">
//             Total Users
//           </p>

//           <h2 className="text-4xl font-bold text-red-500 mt-3">
//             {stats.totalUsers}
//           </h2>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
//           <p className="text-gray-500 font-medium">
//             Total Revenue
//           </p>

//           <h2 className="text-4xl font-bold text-red-500 mt-3">
//             ₹{stats.totalRevenue}
//           </h2>
//         </div>
//       </div>

//       {/* Welcome Banner */}
//       <div className="bg-gradient-to-r from-red-500 to-red-600 text-white mt-8 p-8 rounded-2xl shadow-lg">
//         <h2 className="text-3xl font-bold mb-2">
//           Welcome Admin 👋
//         </h2>

//         <p className="text-red-100">
//           Manage orders, foods, users and revenue from one place.
//         </p>
//       </div>


//       <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white mt-8 p-8 rounded-2xl shadow-lg">

//   <h2 className="text-2xl font-bold mb-4">
//     🤖 AI Business Insights
//   </h2>

//   <div className="whitespace-pre-line leading-8">
//     {aiInsights || "Generating AI insights..."}
//   </div>

// </div>


//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
//         <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
//           <h2 className="text-xl font-semibold mb-4">
//             Order Status Analytics
//           </h2>

//           <ResponsiveContainer width="100%" height={350}>
//             <PieChart>
//               <Pie
//                 data={statusData}
//                 dataKey="value"
//                 nameKey="name"
//                 outerRadius={120}
//                 label
//               >
//                 {statusData.map((entry, index) => (
//                   <Cell
//                     key={index}
//                     fill={
//                       COLORS[index % COLORS.length]
//                     }
//                   />
//                 ))}
//               </Pie>

//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
//           <h2 className="text-xl font-semibold mb-4">
//             Monthly Revenue
//           </h2>

//           <ResponsiveContainer width="100%" height={350}>
//             <BarChart data={revenueData}>
//               <CartesianGrid strokeDasharray="3 3" />

//               <XAxis dataKey="month" />

//               <YAxis />

//               <Tooltip />

//               <Bar
//                 dataKey="revenue"
//                 fill="#EF4444"
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 lg:col-span-2">
//           <h2 className="text-xl font-semibold mb-4">
//             Top Selling Foods
//           </h2>

//           <ResponsiveContainer width="100%" height={350}>
//             <BarChart data={topFoodsData}>
//               <CartesianGrid strokeDasharray="3 3" />

//               <XAxis dataKey="name" />

//               <YAxis />

//               <Tooltip />

//               <Bar
//                 dataKey="sold"
//                 fill="#EF4444"
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Recent Orders */}
//       <div className="bg-white mt-8 p-6 rounded-2xl shadow-md border border-gray-100">
//         <h2 className="text-2xl font-semibold mb-4">
//           Recent Orders
//         </h2>

//         <table className="w-full">
//           <thead>
//             <tr className="border-b bg-gray-50">
//               <th className="text-left p-4">
//                 Customer
//               </th>

//               <th className="text-left p-4">
//                 Amount
//               </th>

//               <th className="text-left p-4">
//                 Status
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {Array.isArray(recentOrders) &&
//   recentOrders.map((order) => (
//               <tr
//                 key={order._id}
//                 className="border-b hover:bg-gray-50"
//               >
//                 <td className="p-4">
//                   {order.user?.fullName}
//                 </td>

//                 <td className="p-4">
//                   ₹{order.total}
//                 </td>

//                 <td className="p-4">
//                   {order.status}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </AdminLayout>
//   );
// }

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminLayout from "../components/AdminLayout";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#EF4444",
  "#F97316",
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#8B5CF6",
];

function Dashboard() {
  const navigate = useNavigate();

  const [aiInsights, setAiInsights] = useState("");
  const [recentOrders, setRecentOrders] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [topFoodsData, setTopFoodsData] = useState([]);

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchDashboardData();
    fetchRecentOrders();
    fetchOrderStatusChart();
    fetchRevenueChart();
    fetchTopFoodsChart();
    fetchAIInsights();
  }, []);

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // =========================
  // DASHBOARD STATS
  // =========================
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      setStats({
        totalOrders: response.data.totalOrders || 0,
        totalUsers: response.data.totalUsers || 0,
        totalRevenue: response.data.totalRevenue || 0,
      });
    } catch (error) {
      console.error("Dashboard Stats Error:", error);
    }
  };

  // =========================
  // RECENT ORDERS
  // =========================
  const fetchRecentOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/orders/recent"
      );

      setRecentOrders(response.data.orders || []);
    } catch (error) {
      console.error("Recent Orders Error:", error);
      setRecentOrders([]);
    }
  };

  // =========================
  // ORDER STATUS CHART
  // =========================
  const fetchOrderStatusChart = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard/order-status-chart"
      );

      const formatted = response.data.map((item) => ({
        name: item._id,
        value: item.count,
      }));

      setStatusData(formatted);
    } catch (error) {
      console.error("Order Status Chart Error:", error);
      setStatusData([]);
    }
  };

  // =========================
  // REVENUE CHART
  // =========================
  const fetchRevenueChart = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard/revenue-chart"
      );

      setRevenueData(response.data || []);
    } catch (error) {
      console.error("Revenue Chart Error:", error);
      setRevenueData([]);
    }
  };

  // =========================
  // TOP FOODS
  // =========================
  const fetchTopFoodsChart = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard/top-selling-foods"
      );

      setTopFoodsData(response.data || []);
    } catch (error) {
      console.error("Top Foods Chart Error:", error);
      setTopFoodsData([]);
    }
  };

  // =========================
  // AI INSIGHTS
  // =========================
  const fetchAIInsights = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/ai-insights"
      );

      setAiInsights(response.data.insights || "");
    } catch (error) {
      console.error("AI Insights Error:", error);
      setAiInsights("Unable to generate AI insights.");
    }
  };

  // =========================
  // STATUS LABEL
  // =========================
  const formatStatus = (status) => {
    if (!status) return "Unknown";

    return status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // =========================
  // STATUS COLOR
  // =========================
  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";

      case "confirmed":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";

      case "preparing":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";

      case "out_for_delivery":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";

      case "delivered":
        return "bg-green-500/10 text-green-400 border-green-500/20";

      case "cancelled":
        return "bg-red-500/10 text-red-400 border-red-500/20";

      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <AdminLayout title="Dashboard">

  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

    <div>
      <p className="text-gray-500 text-sm">
        Welcome back, Admin
      </p>

      <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
        Dashboard
      </h1>
    </div>

    <button
      onClick={handleLogout}
      className="
        w-full sm:w-auto
        px-5 py-2.5
        rounded-xl
        bg-red-500
        hover:bg-red-600
        active:scale-95
        text-white
        font-semibold
        transition
        shadow-lg
        shadow-red-500/20
      "
    >
      Logout
    </button>

  </div>

      {/* =========================================
          STAT CARDS
      ========================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">

        {/* Total Orders */}
        <div className="
          bg-[#101722]
          border border-white/10
          rounded-2xl
          p-5 sm:p-6
          shadow-xl
          hover:border-red-500/30
          transition
        ">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-400 text-sm font-medium">
                Total Orders
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
                {stats.totalOrders}
              </h2>

              <p className="text-gray-500 text-xs mt-2">
                All customer orders
              </p>
            </div>

            <div className="
              w-12 h-12
              rounded-xl
              bg-red-500/10
              border border-red-500/20
              flex items-center justify-center
              text-2xl
            ">
              🛍️
            </div>

          </div>

        </div>

        {/* Total Users */}
        <div className="
          bg-[#101722]
          border border-white/10
          rounded-2xl
          p-5 sm:p-6
          shadow-xl
          hover:border-blue-500/30
          transition
        ">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-400 text-sm font-medium">
                Total Users
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
                {stats.totalUsers}
              </h2>

              <p className="text-gray-500 text-xs mt-2">
                Registered customers
              </p>
            </div>

            <div className="
              w-12 h-12
              rounded-xl
              bg-blue-500/10
              border border-blue-500/20
              flex items-center justify-center
              text-2xl
            ">
              👥
            </div>

          </div>

        </div>

        {/* Revenue */}
        <div className="
          bg-[#101722]
          border border-white/10
          rounded-2xl
          p-5 sm:p-6
          shadow-xl
          hover:border-green-500/30
          transition
          sm:col-span-2
          lg:col-span-1
        ">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-400 text-sm font-medium">
                Total Revenue
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
                ₹{stats.totalRevenue}
              </h2>

              <p className="text-gray-500 text-xs mt-2">
                Revenue generated
              </p>
            </div>

            <div className="
              w-12 h-12
              rounded-xl
              bg-green-500/10
              border border-green-500/20
              flex items-center justify-center
              text-2xl
            ">
              ₹
            </div>

          </div>

        </div>

      </div>

      {/* =========================================
          WELCOME BANNER
      ========================================= */}
      <div className="
        relative
        overflow-hidden
        bg-gradient-to-r
        from-red-600
        via-red-500
        to-red-700
        mt-6 lg:mt-8
        p-6 sm:p-8
        rounded-2xl
        shadow-xl
      ">

        <div className="relative z-10">

          <p className="text-red-100 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
            Fresh Bites Admin
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome Admin 👋
          </h2>

          <p className="text-red-100 mt-2 text-sm sm:text-base max-w-2xl">
            Manage orders, foods, users, revenue and business
            insights from one place.
          </p>

        </div>

        <div className="
          absolute
          -right-10
          -bottom-16
          w-48
          h-48
          rounded-full
          bg-white/10
        " />

        <div className="
          absolute
          right-20
          -top-20
          w-40
          h-40
          rounded-full
          bg-white/5
        " />

      </div>

      {/* =========================================
          AI BUSINESS INSIGHTS
      ========================================= */}
      <div className="
        relative
        overflow-hidden
        mt-6 lg:mt-8
        bg-[#101722]
        border border-purple-500/20
        rounded-2xl
        shadow-xl
      ">

        <div className="
          p-5 sm:p-6
          border-b border-white/10
          flex items-center gap-3
        ">

          <div className="
            w-11 h-11
            rounded-xl
            bg-purple-500/10
            border border-purple-500/20
            flex items-center justify-center
            text-xl
          ">
            🤖
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              AI Business Insights
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              AI-powered analysis of your business
            </p>
          </div>

        </div>

        <div className="
          p-5 sm:p-6
          text-gray-300
          text-sm
          sm:text-base
          leading-7
          whitespace-pre-line
        ">
          {aiInsights || "Generating AI insights..."}
        </div>

      </div>

      {/* =========================================
          CHARTS
      ========================================= */}
      <div className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
        mt-6 lg:mt-8
      ">

        {/* Order Status */}
        <div className="
          bg-[#101722]
          border border-white/10
          rounded-2xl
          p-4 sm:p-6
          shadow-xl
          min-w-0
        ">

          <div className="mb-4">

            <h2 className="text-lg sm:text-xl font-bold text-white">
              Order Status Analytics
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Current order distribution
            </p>

          </div>

          <div className="w-full h-[280px] sm:h-[330px]">

            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>

                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius="65%"
                    innerRadius="35%"
                    paddingAngle={3}
                    label
                  >

                    {statusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}

                  </Pie>

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#101722",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                    labelStyle={{
                      color: "#fff",
                    }}
                  />

                  <Legend
                    wrapperStyle={{
                      color: "#9ca3af",
                      fontSize: "12px",
                    }}
                  />

                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="
                h-full
                flex
                items-center
                justify-center
                text-gray-500
                text-sm
              ">
                No order status data available
              </div>
            )}

          </div>

        </div>

        {/* Monthly Revenue */}
        <div className="
          bg-[#101722]
          border border-white/10
          rounded-2xl
          p-4 sm:p-6
          shadow-xl
          min-w-0
        ">

          <div className="mb-4">

            <h2 className="text-lg sm:text-xl font-bold text-white">
              Monthly Revenue
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Revenue performance by month
            </p>

          </div>

          <div className="w-full h-[280px] sm:h-[330px]">

            {revenueData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{
                    top: 10,
                    right: 5,
                    left: -15,
                    bottom: 5,
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.08)"
                  />

                  <XAxis
                    dataKey="month"
                    tick={{
                      fill: "#9ca3af",
                      fontSize: 11,
                    }}
                    axisLine={{
                      stroke: "rgba(255,255,255,0.1)",
                    }}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{
                      fill: "#9ca3af",
                      fontSize: 11,
                    }}
                    axisLine={{
                      stroke: "rgba(255,255,255,0.1)",
                    }}
                    tickLine={false}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#101722",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />

                  <Bar
                    dataKey="revenue"
                    fill="#EF4444"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="
                h-full
                flex
                items-center
                justify-center
                text-gray-500
                text-sm
              ">
                No revenue data available
              </div>
            )}

          </div>

        </div>

        {/* Top Selling Foods */}
        <div className="
          bg-[#101722]
          border border-white/10
          rounded-2xl
          p-4 sm:p-6
          shadow-xl
          min-w-0
          lg:col-span-2
        ">

          <div className="mb-4">

            <h2 className="text-lg sm:text-xl font-bold text-white">
              Top Selling Foods
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Most popular food items
            </p>

          </div>

          <div className="w-full h-[300px] sm:h-[350px]">

            {topFoodsData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topFoodsData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -15,
                    bottom: 5,
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.08)"
                  />

                  <XAxis
                    dataKey="name"
                    tick={{
                      fill: "#9ca3af",
                      fontSize: 11,
                    }}
                    axisLine={{
                      stroke: "rgba(255,255,255,0.1)",
                    }}
                    tickLine={false}
                    interval="preserveStartEnd"
                  />

                  <YAxis
                    tick={{
                      fill: "#9ca3af",
                      fontSize: 11,
                    }}
                    axisLine={{
                      stroke: "rgba(255,255,255,0.1)",
                    }}
                    tickLine={false}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#101722",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />

                  <Bar
                    dataKey="sold"
                    fill="#EF4444"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="
                h-full
                flex
                items-center
                justify-center
                text-gray-500
                text-sm
              ">
                No food sales data available
              </div>
            )}

          </div>

        </div>

      </div>

      {/* =========================================
          RECENT ORDERS
      ========================================= */}
      <div className="
        bg-[#101722]
        border border-white/10
        mt-6 lg:mt-8
        rounded-2xl
        shadow-xl
        overflow-hidden
      ">

        {/* Header */}
        <div className="
          p-5 sm:p-6
          border-b border-white/10
          flex
          items-center
          justify-between
          gap-3
        ">

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Recent Orders
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Latest customer orders
            </p>
          </div>

          <button
            onClick={() => navigate("/orders")}
            className="
              text-red-400
              hover:text-red-300
              text-xs sm:text-sm
              font-semibold
              transition
              whitespace-nowrap
            "
          >
            View All →
          </button>

        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b border-white/10">

                <th className="
                  text-left
                  px-6 py-4
                  text-xs
                  uppercase
                  tracking-wider
                  text-gray-500
                  font-semibold
                ">
                  Customer
                </th>

                <th className="
                  text-left
                  px-6 py-4
                  text-xs
                  uppercase
                  tracking-wider
                  text-gray-500
                  font-semibold
                ">
                  Amount
                </th>

                <th className="
                  text-left
                  px-6 py-4
                  text-xs
                  uppercase
                  tracking-wider
                  text-gray-500
                  font-semibold
                ">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>

              {Array.isArray(recentOrders) &&
              recentOrders.length > 0 ? (

                recentOrders.map((order) => (

                  <tr
                    key={order._id}
                    className="
                      border-b
                      border-white/5
                      hover:bg-white/[0.02]
                      transition
                    "
                  >

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="
                          w-9 h-9
                          rounded-full
                          bg-red-500/10
                          border border-red-500/20
                          flex items-center justify-center
                          text-sm
                        ">
                          👤
                        </div>

                        <div>

                          <p className="text-sm font-medium text-white">
                            {order.user?.fullName || "Customer"}
                          </p>

                          <p className="text-xs text-gray-500">
                            #{order._id?.slice(-8).toUpperCase()}
                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="
                      px-6 py-4
                      text-sm
                      font-semibold
                      text-white
                    ">
                      ₹{order.total}
                    </td>

                    <td className="px-6 py-4">

                      <span className={`
                        inline-flex
                        items-center
                        px-3 py-1.5
                        rounded-full
                        text-xs
                        font-semibold
                        border
                        ${getStatusStyle(order.status)}
                      `}>
                        {formatStatus(order.status)}
                      </span>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="3"
                    className="
                      text-center
                      py-12
                      text-gray-500
                      text-sm
                    "
                  >
                    No recent orders found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 space-y-3">

          {Array.isArray(recentOrders) &&
          recentOrders.length > 0 ? (

            recentOrders.map((order) => (

              <div
                key={order._id}
                className="
                  bg-[#0b111b]
                  border border-white/10
                  rounded-xl
                  p-4
                "
              >

                <div className="
                  flex
                  items-center
                  justify-between
                  gap-3
                ">

                  <div className="flex items-center gap-3 min-w-0">

                    <div className="
                      w-10 h-10
                      flex-shrink-0
                      rounded-full
                      bg-red-500/10
                      border border-red-500/20
                      flex items-center justify-center
                    ">
                      👤
                    </div>

                    <div className="min-w-0">

                      <p className="
                        text-sm
                        font-semibold
                        text-white
                        truncate
                      ">
                        {order.user?.fullName || "Customer"}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        #{order._id?.slice(-8).toUpperCase()}
                      </p>

                    </div>

                  </div>

                  <p className="
                    text-sm
                    font-bold
                    text-red-400
                    whitespace-nowrap
                  ">
                    ₹{order.total}
                  </p>

                </div>

                <div className="
                  mt-3
                  pt-3
                  border-t border-white/5
                  flex
                  items-center
                  justify-between
                ">

                  <span className="text-xs text-gray-500">
                    Order Status
                  </span>

                  <span className={`
                    inline-flex
                    items-center
                    px-3 py-1.5
                    rounded-full
                    text-xs
                    font-semibold
                    border
                    ${getStatusStyle(order.status)}
                  `}>
                    {formatStatus(order.status)}
                  </span>

                </div>

              </div>

            ))

          ) : (

            <div className="
              text-center
              py-10
              text-gray-500
              text-sm
            ">
              No recent orders found.
            </div>

          )}

        </div>

      </div>

      {/* Bottom Spacing */}
      <div className="h-6" />

    </AdminLayout>
  );
}

export default Dashboard;