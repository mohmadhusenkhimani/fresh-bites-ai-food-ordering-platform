import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const API_BASE = "http://localhost:5000";

const COLORS = [
  "#EF4444",
  "#F97316",
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#8B5CF6",
];

const TOOLTIP_STYLE = {
  backgroundColor: "#101722",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  color: "#fff",
};

const EMPTY_ML_ANALYTICS = {
  segments: [],
  recommendations: [],
  sentiment: [],
  demand: [],
  reviewFoods: [],
  wasteItems: [],
  wasteSummary: { low: 0, medium: 0, high: 0 },
  wasteItemsAnalyzed: 0,
  wasteMethod: "",
  wastePeriodStart: null,
  wastePeriodEnd: null,
  wasteNote: "",
  wasteLoadFailed: false,
  loading: true,
  error: "",
  demandThrough: null,
  demandMethod: "",
};

const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

const formatStatus = (status) =>
  String(status || "unknown")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const getStatusStyle = (status) => {
  const normalized = String(status || "").toLowerCase();

  const styles = {
    pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    confirmed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    preparing: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    out_for_delivery:
      "bg-purple-500/10 text-purple-400 border-purple-500/20",
    delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    styles[normalized] ||
    "bg-gray-500/10 text-gray-400 border-gray-500/20"
  );
};

const getWasteRiskStyle = (risk) => {
  const normalized = String(risk || "").toLowerCase();

  const styles = {
    low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
    medium: "bg-amber-500/10 text-amber-400 border-amber-500/25",
    high: "bg-red-500/10 text-red-400 border-red-500/25",
  };

  return (
    styles[normalized] ||
    "bg-gray-500/10 text-gray-400 border-gray-500/20"
  );
};

function SectionCard({ title, subtitle, children, action }) {
  return (
    <section className="min-w-0 rounded-2xl border border-white/10 bg-[#101722] p-4 sm:p-5">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function EmptyState({ children = "No data available yet." }) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-white/10 px-4 text-center text-sm text-gray-500">
      {children}
    </div>
  );
}

function parseAIInsights(text) {
  if (typeof text !== "string" || !text.trim()) return [];

  const normalized = text
    .replace(/\r\n/g, "\n")
    .replace(/\u00a0/g, " ");

  const headingPattern =
    /(?:\*\*)?Insight\s+\d+\s*[:\-–]\s*(.*?)(?:\*\*)?\s*(?=\n|$)/gi;

  const headings = [...normalized.matchAll(headingPattern)];
  if (headings.length === 0) return [];

  return headings.map((heading, index) => {
    const start = heading.index ?? 0;
    const nextStart =
      index + 1 < headings.length
        ? headings[index + 1].index
        : normalized.length;

    const block = normalized.slice(start, nextStart);
    const title = (heading[1] || "").replace(/\*\*/g, "").trim();

    const observationMatch = block.match(
      /\*{0,2}Observation\s*:\*{0,2}\s*([\s\S]*?)(?=\*{0,2}Recommendation\s*:\*{0,2}|$)/i
    );

    const recommendationMatch = block.match(
      /\*{0,2}Recommendation\s*:\*{0,2}\s*([\s\S]*?)$/i
    );

    const clean = (value) =>
      (value || "")
        .replace(/\*\*/g, "")
        .replace(/^[-•]\s*/, "")
        .trim();

    return {
      id: index,
      title: title || `Business Insight ${index + 1}`,
      observation: clean(observationMatch?.[1]),
      recommendation: clean(recommendationMatch?.[1]),
    };
  });
}

function AIInsightsContent({ text, loading }) {
  if (loading && !text) {
    return (
      <EmptyState>
        <span className="animate-pulse">
          Generating AI business insights...
        </span>
      </EmptyState>
    );
  }

  if (!text) {
    return <EmptyState>AI insights are not available.</EmptyState>;
  }

  const insights = parseAIInsights(text);

  if (insights.length === 0) {
    return (
      <div className="whitespace-pre-line rounded-xl bg-[#0b111b] p-4 text-sm leading-7 text-gray-300">
        {text}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      {insights.map((insight) => (
        <article
          key={insight.id}
          className="rounded-xl border border-purple-500/20 bg-[#0b111b] p-4 sm:p-5"
        >
          <div className="mb-4 flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-sm font-bold text-purple-300">
              {insight.id + 1}
            </span>
            <h3 className="pt-1 font-semibold text-white">{insight.title}</h3>
          </div>

          {insight.observation && (
            <div className="mb-4">
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-blue-400">
                Observation
              </p>
              <p className="whitespace-pre-line text-sm leading-6 text-gray-300">
                {insight.observation}
              </p>
            </div>
          )}

          {insight.recommendation && (
            <div className="rounded-lg border border-emerald-500/15 bg-emerald-500/5 p-3">
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
                Recommendation
              </p>
              <p className="whitespace-pre-line text-sm leading-6 text-gray-300">
                {insight.recommendation}
              </p>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();

  const [aiInsights, setAiInsights] = useState("");
  const [aiLoading, setAiLoading] = useState(true);

  const [recentOrders, setRecentOrders] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [topFoodsData, setTopFoodsData] = useState([]);

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  const [mlAnalytics, setMlAnalytics] = useState(EMPTY_ML_ANALYTICS);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/dashboard`);
      const data = response.data || {};

      setStats({
        totalOrders: Number(data.totalOrders || 0),
        totalUsers: Number(data.totalUsers || 0),
        totalRevenue: Number(data.totalRevenue || 0),
      });
    } catch (error) {
      console.error("Dashboard statistics error:", error);
    }
  }, []);

  const fetchRecentOrders = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/orders/recent`);
      setRecentOrders(
        Array.isArray(response.data?.orders) ? response.data.orders : []
      );
    } catch (error) {
      console.error("Recent orders error:", error);
      setRecentOrders([]);
    }
  }, []);

  const fetchOrderStatusChart = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/dashboard/order-status-chart`
      );

      const items = Array.isArray(response.data) ? response.data : [];
      setStatusData(
        items.map((item) => ({
          name: formatStatus(item._id),
          value: Number(item.count || 0),
        }))
      );
    } catch (error) {
      console.error("Order status chart error:", error);
      setStatusData([]);
    }
  }, []);

  const fetchRevenueChart = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/dashboard/revenue-chart`
      );
      setRevenueData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Revenue chart error:", error);
      setRevenueData([]);
    }
  }, []);

  const fetchTopFoodsChart = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/dashboard/top-selling-foods`
      );
      setTopFoodsData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Top-selling foods error:", error);
      setTopFoodsData([]);
    }
  }, []);

  const fetchAIInsights = useCallback(async () => {
    setAiLoading(true);

    try {
      const response = await axios.get(`${API_BASE}/api/admin/ai-insights`);
      const result = response.data?.insights;

      setAiInsights(
        typeof result === "string" && result.trim()
          ? result
          : "No AI insights are available yet."
      );
    } catch (error) {
      console.error("AI insights error:", error);
      setAiInsights("Unable to generate AI insights. Please try refreshing.");
    } finally {
      setAiLoading(false);
    }
  }, []);

  const fetchMLAnalytics = useCallback(async () => {
    setMlAnalytics((previous) => ({
      ...previous,
      loading: true,
      error: "",
    }));

    const endpoints = [
      "customer-segments",
      "recommendations",
      "review-sentiment",
      "demand-forecast",
      "review-food-summary",
      "food-waste-prediction",
    ];

    try {
      const results = await Promise.allSettled(
        endpoints.map((endpoint) =>
          axios.get(`${API_BASE}/api/ai-ml/${endpoint}`)
        )
      );

      const failures = results.filter(
        (result) =>
          result.status === "rejected" ||
          result.value?.data?.success === false
      ).length;

      const getData = (index) => {
        const result = results[index];

        if (
          result.status !== "fulfilled" ||
          result.value?.data?.success === false
        ) {
          return null;
        }

        return result.value?.data;
      };

      const segmentsResponse = getData(0);
      const recommendationsResponse = getData(1);
      const sentimentResponse = getData(2);
      const demandResponse = getData(3);
      const reviewFoodsResponse = getData(4);
      const wasteResult = results[5];
      const wasteResponse = getData(5);
      const wasteLoadFailed =
        wasteResult.status === "rejected" ||
        wasteResult.value?.data?.success === false;

      const segments =
        segmentsResponse?.segments ??
        segmentsResponse?.data?.segments ??
        [];

      const recommendations =
        recommendationsResponse?.recommendations ??
        recommendationsResponse?.data?.recommendations ??
        [];

      // API response uses sentimentDistribution.
      const sentiment =
        sentimentResponse?.sentimentDistribution ??
        sentimentResponse?.data?.sentimentDistribution ??
        sentimentResponse?.sentiment ??
        sentimentResponse?.data?.sentiment ??
        sentimentResponse?.results ??
        [];

      // API response uses products for the saved demand forecast.
      const demand =
        demandResponse?.products ??
        demandResponse?.data?.products ??
        demandResponse?.forecast ??
        demandResponse?.data?.forecast ??
        [];

      // API response uses products for food review summaries.
      const reviewFoods =
        reviewFoodsResponse?.products ??
        reviewFoodsResponse?.data?.products ??
        reviewFoodsResponse?.foods ??
        reviewFoodsResponse?.summary ??
        reviewFoodsResponse?.data?.foods ??
        reviewFoodsResponse?.data?.summary ??
        [];

      const wasteItems =
        wasteResponse?.items ?? wasteResponse?.data?.items ?? [];

      const wasteSummaryRaw =
        wasteResponse?.summary ?? wasteResponse?.data?.summary ?? {};

      setMlAnalytics({
        segments: Array.isArray(segments) ? segments : [],
        recommendations: Array.isArray(recommendations)
          ? recommendations
          : [],
        sentiment: Array.isArray(sentiment) ? sentiment : [],
        demand: Array.isArray(demand) ? demand : [],
        reviewFoods: Array.isArray(reviewFoods) ? reviewFoods : [],
        wasteItems: Array.isArray(wasteItems) ? wasteItems : [],
        wasteSummary: {
          low: Number(wasteSummaryRaw.low ?? 0),
          medium: Number(wasteSummaryRaw.medium ?? 0),
          high: Number(wasteSummaryRaw.high ?? 0),
        },
        wasteItemsAnalyzed: Number(
          wasteResponse?.itemsAnalyzed ??
            wasteResponse?.data?.itemsAnalyzed ??
            wasteItems.length ??
            0
        ),
        wasteMethod:
          wasteResponse?.method ?? wasteResponse?.data?.method ?? "",
        wastePeriodStart:
          wasteResponse?.dataPeriodStart ??
          wasteResponse?.data?.dataPeriodStart ??
          null,
        wastePeriodEnd:
          wasteResponse?.dataPeriodEnd ??
          wasteResponse?.data?.dataPeriodEnd ??
          null,
        wasteNote: wasteResponse?.note ?? wasteResponse?.data?.note ?? "",
        wasteLoadFailed,
        loading: false,
        error:
          failures > 0
            ? `${failures} analytics endpoint(s) could not be loaded.`
            : "",
        demandThrough:
          demandResponse?.historicalDataThrough ??
          demandResponse?.data?.historicalDataThrough ??
          null,
        demandMethod:
          demandResponse?.method ??
          demandResponse?.data?.method ??
          "",
      });
    } catch (error) {
      console.error("AI/ML analytics error:", error);
      setMlAnalytics({
        ...EMPTY_ML_ANALYTICS,
        loading: false,
        error: "Unable to load AI/ML analytics.",
      });
    }
  }, []);

  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        fetchDashboardData(),
        fetchRecentOrders(),
        fetchOrderStatusChart(),
        fetchRevenueChart(),
        fetchTopFoodsChart(),
        fetchAIInsights(),
        fetchMLAnalytics(),
      ]);
    } finally {
      setRefreshing(false);
    }
  }, [
    fetchDashboardData,
    fetchRecentOrders,
    fetchOrderStatusChart,
    fetchRevenueChart,
    fetchTopFoodsChart,
    fetchAIInsights,
    fetchMLAnalytics,
  ]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const statusTotal = statusData.reduce(
    (sum, item) => sum + Number(item.value || 0),
    0
  );

  const sentimentData = mlAnalytics.sentiment.map((item) => ({
    name: item.sentiment ?? item.label ?? item._id ?? "Unknown",
    count: Number(item.count ?? item.total ?? 0),
    percentage: Number(item.percentage ?? 0),
  }));

  const demandChartData = mlAnalytics.demand.map((item) => ({
    foodName:
      item.foodName ??
      item.food ??
      item.name ??
      item.food_name ??
      "Food",
    estimatedUnits: Number(
      item.estimatedUnits ??
        item.estimated_units ??
        item.predictedUnits ??
        item.predicted_units ??
        item.prediction ??
        item.forecast ??
        0
    ),
  }));

  const reviewFoods = mlAnalytics.reviewFoods;
  const recommendations = mlAnalytics.recommendations;

  const wasteRiskChartData = [
    { name: "Low", count: mlAnalytics.wasteSummary.low, fill: "#10B981" },
    { name: "Medium", count: mlAnalytics.wasteSummary.medium, fill: "#F59E0B" },
    { name: "High", count: mlAnalytics.wasteSummary.high, fill: "#EF4444" },
  ].filter((item) => item.count > 0);

  const StatCard = ({ title, value, description, icon }) => (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-[#101722] p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-gray-400">{title}</p>
          <p className="mt-3 break-words text-2xl font-bold text-white sm:text-3xl">
            {value}
          </p>
          <p className="mt-2 text-xs text-gray-500">{description}</p>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-xl">
          {icon}
        </span>
      </div>
    </div>
  );

  return (
    <AdminLayout title="Dashboard">
      <div className="min-w-0 space-y-6 text-white">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-400">Welcome back, Admin</p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              Dashboard
            </h1>
            <div className="mt-2 flex items-center gap-2 text-xs text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Admin Online
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={refreshAll}
              disabled={refreshing}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-gray-200 transition hover:bg-white/10 disabled:opacity-50"
            >
              {refreshing ? "Refreshing..." : "Refresh Dashboard ↻"}
            </button>
            <button
              onClick={handleLogout}
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            title="Total Orders"
            value={stats.totalOrders.toLocaleString("en-IN")}
            description="All customer orders"
            icon="🛍️"
          />
          <StatCard
            title="Total Users"
            value={stats.totalUsers.toLocaleString("en-IN")}
            description="Registered customers"
            icon="👥"
          />
          <StatCard
            title="Delivered-Order Revenue"
            value={formatCurrency(stats.totalRevenue)}
            description="Revenue from delivered orders"
            icon="₹"
          />
        </div>

        <section className="overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-r from-red-950/70 via-[#151322] to-[#101722] p-6 sm:p-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-red-400">
              Fresh Bites Admin
            </p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Welcome Admin 👋
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-300 sm:text-base">
              Manage orders, foods, users, revenue and business insights from
              one place.
            </p>
          </div>
        </section>

        <SectionCard
          title="🤖 AI Business Insights"
          subtitle="AI-powered analysis of your business"
        >
          <AIInsightsContent text={aiInsights} loading={aiLoading} />
        </SectionCard>

        <section className="space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-purple-400">
                Machine Learning
              </p>
              <h2 className="mt-1 text-2xl font-bold">AI/ML Analytics</h2>
              <p className="mt-2 text-sm text-gray-400">
                Customer behavior, recommendations, reviews, demand, and waste
                risk.
              </p>
            </div>

            <button
              onClick={fetchMLAnalytics}
              disabled={mlAnalytics.loading}
              className="rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-2.5 text-sm font-semibold text-purple-300 transition hover:bg-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {mlAnalytics.loading ? "Refreshing..." : "Refresh Analytics ↻"}
            </button>
          </div>

          {mlAnalytics.error && (
            <div
              role="status"
              className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3 text-sm text-yellow-300"
            >
              {mlAnalytics.error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            <SectionCard
              title="Customer Segmentation"
              subtitle="Exploratory RFM and KMeans analysis"
            >
              {mlAnalytics.loading ? (
                <EmptyState>Loading customer segments...</EmptyState>
              ) : mlAnalytics.segments.length === 0 ? (
                <EmptyState>No customer segmentation data available.</EmptyState>
              ) : (
                <>
                  <div className="h-64 min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mlAnalytics.segments}
                          dataKey="customers"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={85}
                          innerRadius={48}
                          paddingAngle={3}
                        >
                          {mlAnalytics.segments.map((segment, index) => (
                            <Cell
                              key={`${segment.name}-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={TOOLTIP_STYLE} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {mlAnalytics.segments.map((segment, index) => (
                      <div
                        key={`${segment.name}-${index}`}
                        className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-[#0b111b] p-3"
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          <span
                            className="h-3 w-3 shrink-0 rounded-full"
                            style={{
                              backgroundColor: COLORS[index % COLORS.length],
                            }}
                          />
                          <span className="truncate text-sm text-gray-300">
                            {segment.name}
                          </span>
                        </div>
                        <span className="font-semibold text-white">
                          {Number(segment.customers || 0)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 text-xs text-gray-500">
                    {mlAnalytics.segments.reduce(
                      (sum, segment) =>
                        sum + Number(segment.customers || 0),
                      0
                    )}{" "}
                    customers analyzed. Segment labels are exploratory.
                  </p>
                </>
              )}
            </SectionCard>

            <SectionCard
              title="Review Sentiment"
              subtitle="Explainable word-lexicon baseline"
            >
              {mlAnalytics.loading ? (
                <EmptyState>Loading review sentiment...</EmptyState>
              ) : sentimentData.length === 0 ? (
                <EmptyState>No review sentiment data available.</EmptyState>
              ) : (
                <>
                  <div className="h-80 min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={sentimentData}
                        margin={{ top: 10, right: 8, left: -15, bottom: 10 }}
                      >
                        <CartesianGrid
                          stroke="rgba(255,255,255,0.07)"
                          strokeDasharray="3 3"
                        />
                        <XAxis
                          dataKey="name"
                          tick={{ fill: "#9CA3AF", fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          allowDecimals={false}
                          tick={{ fill: "#9CA3AF", fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          contentStyle={TOOLTIP_STYLE}
                          formatter={(value, name, props) => [
                            `${value} reviews${
                              props?.payload?.percentage
                                ? ` (${props.payload.percentage}%)`
                                : ""
                            }`,
                            "Sentiment",
                          ]}
                        />
                        <Bar
                          dataKey="count"
                          name="Reviews"
                          fill="#8B5CF6"
                          radius={[6, 6, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    {sentimentData.reduce((sum, item) => sum + item.count, 0)}{" "}
                    reviews analyzed. This is a lexicon baseline, not a
                    validated ML model.
                  </p>
                </>
              )}
            </SectionCard>
          </div>

          <SectionCard
            title="Recommended Foods"
            subtitle="Popularity and rating baseline — not a trained recommendation model"
          >
            {mlAnalytics.loading ? (
              <EmptyState>Loading food recommendations...</EmptyState>
            ) : recommendations.length === 0 ? (
              <EmptyState>No food recommendations available.</EmptyState>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500">
                      <th className="px-3 py-3">Food</th>
                      <th className="px-3 py-3">Category</th>
                      <th className="px-3 py-3">Price</th>
                      <th className="px-3 py-3">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recommendations.map((food, index) => (
                      <tr
                        key={`${food.name || food.foodName || "food"}-${index}`}
                        className="border-b border-white/5 last:border-0"
                      >
                        <td className="px-3 py-4 font-medium text-white">
                          {food.name || food.foodName || food.food_name || "—"}
                        </td>
                        <td className="px-3 py-4 text-gray-400">
                          {food.category || "—"}
                        </td>
                        <td className="px-3 py-4 text-gray-300">
                          {formatCurrency(food.price)}
                        </td>
                        <td className="px-3 py-4 text-purple-300">
                          {Number(
                            food.score ?? food.recommendationScore ?? 0
                          ).toFixed(3)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </SectionCard>

          <SectionCard
            title="Food Demand Forecast"
            subtitle={
              mlAnalytics.demandMethod
                ? `Saved baseline: ${mlAnalytics.demandMethod}`
                : "Saved historical-average baseline"
            }
          >
            {mlAnalytics.demandThrough && (
              <p className="mb-4 text-sm text-gray-400">
                Historical data through:{" "}
                <span className="font-medium text-gray-200">
                  {String(mlAnalytics.demandThrough).slice(0, 10)}
                </span>
              </p>
            )}

            {mlAnalytics.loading ? (
              <EmptyState>Loading demand forecast...</EmptyState>
            ) : demandChartData.length === 0 ? (
              <EmptyState>No demand forecast data available.</EmptyState>
            ) : (
              <>
                <div className="h-80 min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={demandChartData}
                      margin={{ top: 10, right: 8, left: -10, bottom: 10 }}
                    >
                      <CartesianGrid
                        stroke="rgba(255,255,255,0.07)"
                        strokeDasharray="3 3"
                      />
                      <XAxis
                        dataKey="foodName"
                        tick={{ fill: "#9CA3AF", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: "#9CA3AF", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={TOOLTIP_STYLE}
                        formatter={(value) => [
                          `${value} estimated units`,
                          "7-day estimate",
                        ]}
                      />
                      <Bar
                        dataKey="estimatedUnits"
                        name="Estimated units"
                        fill="#F97316"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <p className="mt-3 text-xs leading-5 text-gray-500">
                  {mlAnalytics.demandMethod || "Baseline estimates"}; these
                  values come from a saved report, not a validated live
                  prediction. The report's historical cutoff is{" "}
                  {mlAnalytics.demandThrough || "not provided"}.
                </p>
              </>
            )}
          </SectionCard>

          <SectionCard
            title="AI Food Waste Prediction"
            subtitle={
              mlAnalytics.wasteMethod ||
              "Surplus waste-risk estimates from order history (not observed waste)"
            }
          >
            {mlAnalytics.wastePeriodStart && mlAnalytics.wastePeriodEnd && (
              <p className="mb-4 text-sm text-gray-400">
                Analysis period:{" "}
                <span className="font-medium text-gray-200">
                  {String(mlAnalytics.wastePeriodStart).slice(0, 10)} —{" "}
                  {String(mlAnalytics.wastePeriodEnd).slice(0, 10)}
                </span>
              </p>
            )}

            {mlAnalytics.loading ? (
              <EmptyState>
                <span className="animate-pulse">
                  Loading food waste-risk estimates...
                </span>
              </EmptyState>
            ) : mlAnalytics.wasteLoadFailed ? (
              <EmptyState>
                Unable to load food waste prediction. Ensure the Python AI/ML
                service is running and MongoDB is configured.
              </EmptyState>
            ) : mlAnalytics.wasteItems.length === 0 ? (
              <EmptyState>
                No menu items available for waste-risk analysis.
              </EmptyState>
            ) : (
              <>
                <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl border border-red-500/20 bg-[#0b111b] p-4">
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Items analyzed
                    </p>
                    <p className="mt-2 text-2xl font-bold text-white">
                      {mlAnalytics.wasteItemsAnalyzed}
                    </p>
                  </div>
                  <div className="rounded-xl border border-emerald-500/20 bg-[#0b111b] p-4">
                    <p className="text-xs uppercase tracking-wider text-emerald-400">
                      Low risk
                    </p>
                    <p className="mt-2 text-2xl font-bold text-emerald-300">
                      {mlAnalytics.wasteSummary.low}
                    </p>
                  </div>
                  <div className="rounded-xl border border-amber-500/20 bg-[#0b111b] p-4">
                    <p className="text-xs uppercase tracking-wider text-amber-400">
                      Medium risk
                    </p>
                    <p className="mt-2 text-2xl font-bold text-amber-300">
                      {mlAnalytics.wasteSummary.medium}
                    </p>
                  </div>
                  <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
                    <p className="text-xs uppercase tracking-wider text-red-400">
                      High risk
                    </p>
                    <p className="mt-2 text-2xl font-bold text-red-300">
                      {mlAnalytics.wasteSummary.high}
                    </p>
                  </div>
                </div>

                {wasteRiskChartData.length > 0 && (
                  <div className="mb-6 h-56 min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={wasteRiskChartData}
                        margin={{ top: 8, right: 8, left: -10, bottom: 0 }}
                      >
                        <CartesianGrid
                          stroke="rgba(255,255,255,0.07)"
                          strokeDasharray="3 3"
                        />
                        <XAxis
                          dataKey="name"
                          tick={{ fill: "#9CA3AF", fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          allowDecimals={false}
                          tick={{ fill: "#9CA3AF", fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip contentStyle={TOOLTIP_STYLE} />
                        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                          {wasteRiskChartData.map((entry, index) => (
                            <Cell key={`${entry.name}-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500">
                        <th className="px-3 py-3">Food</th>
                        <th className="px-3 py-3">Category</th>
                        <th className="px-3 py-3">Waste risk</th>
                        <th className="px-3 py-3">Est. surplus / day</th>
                        <th className="px-3 py-3">Reasons</th>
                        <th className="px-3 py-3">Suggestions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mlAnalytics.wasteItems.map((item, index) => (
                        <tr
                          key={`${item.foodName || "food"}-${index}`}
                          className="border-b border-white/5 align-top last:border-0"
                        >
                          <td className="px-3 py-4 font-medium text-white">
                            {item.foodName || "—"}
                          </td>
                          <td className="px-3 py-4 text-gray-400">
                            {item.category || "—"}
                          </td>
                          <td className="px-3 py-4">
                            <span
                              className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getWasteRiskStyle(
                                item.wasteRisk
                              )}`}
                            >
                              {item.wasteRisk || "—"}
                            </span>
                          </td>
                          <td className="px-3 py-4 text-gray-300">
                            {item.estimatedSurplusUnits != null
                              ? `${Number(item.estimatedSurplusUnits).toFixed(2)} units`
                              : "—"}
                          </td>
                          <td className="max-w-xs px-3 py-4 text-xs leading-5 text-gray-400">
                            {(item.reasons || []).length > 0 ? (
                              <ul className="list-disc space-y-1 pl-4">
                                {item.reasons.map((reason, reasonIndex) => (
                                  <li key={reasonIndex}>{reason}</li>
                                ))}
                              </ul>
                            ) : (
                              "—"
                            )}
                          </td>
                          <td className="max-w-xs px-3 py-4 text-xs leading-5 text-gray-300">
                            {(item.suggestions || []).length > 0 ? (
                              <ul className="list-disc space-y-1 pl-4">
                                {item.suggestions.map(
                                  (suggestion, suggestionIndex) => (
                                    <li key={suggestionIndex}>{suggestion}</li>
                                  )
                                )}
                              </ul>
                            ) : (
                              "—"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="mt-4 text-xs leading-5 text-gray-500">
                  {mlAnalytics.wasteNote ||
                    "Risk levels reflect estimated surplus from sales volatility and recent trends, not confirmed wasted food. Observed wastage is not recorded in FreshBites."}
                </p>
              </>
            )}
          </SectionCard>

          <SectionCard
            title="Food Review Summary"
            subtitle="Ratings and sentiment counts aggregated by food"
          >
            {mlAnalytics.loading ? (
              <EmptyState>Loading food review summaries...</EmptyState>
            ) : reviewFoods.length === 0 ? (
              <EmptyState>No food review summaries available.</EmptyState>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {reviewFoods.map((food, index) => (
                  <article
                    key={`${food.foodName || food.name || "food"}-${index}`}
                    className="rounded-xl border border-white/10 bg-[#0b111b] p-4"
                  >
                    <h3 className="font-semibold text-white">
                      {food.foodName || food.name || "Food"}
                    </h3>

                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-yellow-400">
                        {Number(
                          food.averageRating ?? food.average_rating ?? 0
                        ).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500">/ 5 ★</span>
                    </div>

                    <p className="mt-1 text-xs text-gray-500">
                      {Number(food.reviewCount ?? food.review_count ?? 0)}{" "}
                      reviews
                    </p>

                    <div className="mt-4 space-y-2 border-t border-white/5 pt-3 text-sm">
                      <div className="flex justify-between gap-2">
                        <span className="text-emerald-400">Positive</span>
                        <span className="text-gray-300">
                          {Number(
                            food.positiveReviews ??
                              food.positive_reviews ??
                              0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-yellow-400">Neutral</span>
                        <span className="text-gray-300">
                          {Number(
                            food.neutralReviews ?? food.neutral_reviews ?? 0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-red-400">Negative</span>
                        <span className="text-gray-300">
                          {Number(
                            food.negativeReviews ?? food.negative_reviews ?? 0
                          )}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </SectionCard>
        </section>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <SectionCard
            title="Order Status Analytics"
            subtitle="Current order distribution"
          >
            {statusData.length === 0 ? (
              <EmptyState>No order status data available.</EmptyState>
            ) : (
              <>
                <div className="h-64 min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={90}
                        paddingAngle={3}
                      >
                        {statusData.map((item, index) => (
                          <Cell
                            key={`${item.name}-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={TOOLTIP_STYLE} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {statusData.map((item, index) => (
                    <div
                      key={`${item.name}-${index}`}
                      className="flex items-center justify-between gap-3 rounded-xl bg-[#0b111b] p-3"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span
                          className="h-3 w-3 shrink-0 rounded-full"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                        <span className="truncate text-sm text-gray-300">
                          {item.name}
                        </span>
                      </div>
                      <span className="font-semibold text-white">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-3 text-xs text-gray-500">
                  {statusTotal} orders represented in this chart.
                </p>
              </>
            )}
          </SectionCard>

          <SectionCard
            title="Monthly Revenue"
            subtitle="Revenue performance by month"
          >
            {revenueData.length === 0 ? (
              <EmptyState>No monthly revenue data available.</EmptyState>
            ) : (
              <div className="h-80 min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueData}
                    margin={{ top: 10, right: 8, left: -5, bottom: 10 }}
                  >
                    <CartesianGrid
                      stroke="rgba(255,255,255,0.07)"
                      strokeDasharray="3 3"
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "#9CA3AF", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#9CA3AF", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={TOOLTIP_STYLE}
                      formatter={(value) => formatCurrency(value)}
                    />
                    <Bar
                      dataKey="revenue"
                      name="Revenue"
                      fill="#10B981"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </SectionCard>
        </div>

        <SectionCard
          title="Top Selling Foods"
          subtitle="Most popular food items"
        >
          {topFoodsData.length === 0 ? (
            <EmptyState>No food sales data available.</EmptyState>
          ) : (
            <div className="h-80 min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topFoodsData}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 15, bottom: 5 }}
                >
                  <CartesianGrid
                    stroke="rgba(255,255,255,0.07)"
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    type="number"
                    allowDecimals={false}
                    tick={{ fill: "#9CA3AF", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={110}
                    tick={{ fill: "#D1D5DB", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Bar
                    dataKey="sold"
                    name="Units sold"
                    fill="#F97316"
                    radius={[0, 6, 6, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </SectionCard>

        <SectionCard
          title="Recent Orders"
          subtitle="Latest customer orders"
          action={
            <button
              onClick={() => navigate("/orders")}
              className="text-sm font-semibold text-red-400 transition hover:text-red-300"
            >
              View All →
            </button>
          }
        >
          {recentOrders.length === 0 ? (
            <EmptyState>No recent orders found.</EmptyState>
          ) : (
            <>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[600px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500">
                      <th className="px-3 py-3">Customer</th>
                      <th className="px-3 py-3">Order ID</th>
                      <th className="px-3 py-3">Amount</th>
                      <th className="px-3 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.slice(0, 8).map((order, index) => (
                      <tr
                        key={order._id || index}
                        className="border-b border-white/5 last:border-0"
                      >
                        <td className="px-3 py-4">
                          <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5">
                              👤
                            </span>
                            <span className="font-medium text-gray-200">
                              {order.user?.fullName ||
                                order.user?.name ||
                                order.customerName ||
                                "Guest"}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-4 font-mono text-xs text-gray-400">
                          #{String(order._id || "").slice(-8).toUpperCase()}
                        </td>
                        <td className="px-3 py-4 font-medium text-white">
                          {formatCurrency(order.total)}
                        </td>
                        <td className="px-3 py-4">
                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getStatusStyle(
                              order.status
                            )}`}
                          >
                            {formatStatus(order.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-3 md:hidden">
                {recentOrders.slice(0, 8).map((order, index) => (
                  <article
                    key={order._id || index}
                    className="rounded-xl border border-white/5 bg-[#0b111b] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5">
                          👤
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-white">
                            {order.user?.fullName ||
                              order.user?.name ||
                              order.customerName ||
                              "Guest"}
                          </p>
                          <p className="mt-1 font-mono text-xs text-gray-500">
                            #{String(order._id || "").slice(-8).toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <span className="shrink-0 font-semibold text-white">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                    <div className="mt-3 border-t border-white/5 pt-3">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {formatStatus(order.status)}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </SectionCard>

        <div className="h-6" />
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
