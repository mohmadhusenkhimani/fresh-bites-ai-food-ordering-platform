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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

 useEffect(() => {
  fetchDashboardData();
  fetchRecentOrders();
  fetchOrderStatusChart();
  fetchRevenueChart();
  fetchTopFoodsChart();
  fetchAIInsights();
}, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };
const fetchRecentOrders = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/orders/recent"
    );

    setRecentOrders(response.data.orders || []);
  } catch (error) {
    console.error(error);
    setRecentOrders([]);
  }
};

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
      console.error(error);
    }
  };

  const fetchRevenueChart = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard/revenue-chart"
      );

      setRevenueData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTopFoodsChart = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard/top-selling-foods"
      );

      setTopFoodsData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAIInsights = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/admin/ai-insights"
    );

    setAiInsights(response.data.insights);
  } catch (error) {
    console.error("AI Insights Error:", error);
  }
};

  return (
    <AdminLayout title="Dashboard">
      {/* Logout */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <p className="text-gray-500 font-medium">
            Total Orders
          </p>

          <h2 className="text-4xl font-bold text-red-500 mt-3">
            {stats.totalOrders}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <p className="text-gray-500 font-medium">
            Total Users
          </p>

          <h2 className="text-4xl font-bold text-red-500 mt-3">
            {stats.totalUsers}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <p className="text-gray-500 font-medium">
            Total Revenue
          </p>

          <h2 className="text-4xl font-bold text-red-500 mt-3">
            ₹{stats.totalRevenue}
          </h2>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white mt-8 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-2">
          Welcome Admin 👋
        </h2>

        <p className="text-red-100">
          Manage orders, foods, users and revenue from one place.
        </p>
      </div>


      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white mt-8 p-8 rounded-2xl shadow-lg">

  <h2 className="text-2xl font-bold mb-4">
    🤖 AI Business Insights
  </h2>

  <div className="whitespace-pre-line leading-8">
    {aiInsights || "Generating AI insights..."}
  </div>

</div>


      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">
            Order Status Analytics
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[index % COLORS.length]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">
            Monthly Revenue
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="revenue"
                fill="#EF4444"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">
            Top Selling Foods
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={topFoodsData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="sold"
                fill="#EF4444"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white mt-8 p-6 rounded-2xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-semibold mb-4">
          Recent Orders
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-4">
                Customer
              </th>

              <th className="text-left p-4">
                Amount
              </th>

              <th className="text-left p-4">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(recentOrders) &&
  recentOrders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4">
                  {order.user?.fullName}
                </td>

                <td className="p-4">
                  ₹{order.total}
                </td>

                <td className="p-4">
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;