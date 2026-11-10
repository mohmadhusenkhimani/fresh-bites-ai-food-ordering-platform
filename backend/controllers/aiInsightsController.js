const groq = require("../config/groq");
const Order = require("../models/Order");
const User = require("../models/User");

const getAIInsights = async (req, res) => {
  try {
    // Fetch real data from MongoDB
    const [orders, totalUsers] = await Promise.all([
      Order.find({})
        .select("user items total status createdAt")
        .lean(),
      User.countDocuments({}),
    ]);

    const totalOrders = orders.length;
    const deliveredOrders = orders.filter(
      (order) => String(order.status || "").toLowerCase() === "delivered"
    );

    const totalRevenue = deliveredOrders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );

    const averageDeliveredOrderValue =
      deliveredOrders.length > 0
        ? Number((totalRevenue / deliveredOrders.length).toFixed(2))
        : 0;

    const statusCounts = {};
    const hourlyOrders = Array(24).fill(0);
    const customerOrderCounts = {};

    for (const order of orders) {
      const status = String(order.status || "unknown").toLowerCase();

      statusCounts[status] = (statusCounts[status] || 0) + 1;
      if (
        order.createdAt &&
        String(order.status || "").toLowerCase() === "delivered"
      ) {
        const hour = new Date(order.createdAt).getHours();
        hourlyOrders[hour]++;
      }
      if (order.user) {
        const userId = String(order.user);
        customerOrderCounts[userId] =
          (customerOrderCounts[userId] || 0) + 1;
      }
    }

    const peakHours = hourlyOrders
      .map((count, hour) => ({ hour, count }))
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 4)
      .map(({ hour, count }) => ({
        hour: `${String(hour).padStart(2, "0")}:00`,
        orders: count,
      }));

    const repeatCustomers = Object.values(customerOrderCounts).filter(
      (count) => count >= 2
    ).length;

    const businessData = {
      totalOrders,
      totalUsers,
      deliveredOrderCount: deliveredOrders.length,
      deliveredOrderRevenue: Number(totalRevenue.toFixed(2)),
      averageDeliveredOrderValue,
      orderStatusCounts: statusCounts,
      busiestHours: peakHours,
      customersWithMultipleOrders: repeatCustomers,
      revenueDefinition:
        "Revenue is the sum of order.total for delivered orders only. It is not profit.",
    };

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: `
You are a business analyst for Fresh Bites, an Indian food delivery platform.

Analyze only the supplied JSON metrics.

RULES:
1. Return exactly four short business insights.
2. All monetary values must use Indian rupees (₹), never dollars or USD.
3. Use deliveredOrderRevenue only when discussing revenue.
4. Use averageDeliveredOrderValue only when discussing average order value.
5. Clearly state that revenue and average order value are based on delivered orders.
6. Do not describe delivered-order revenue as total revenue, profit, or non-cancelled-order revenue.
7. The busiestHours metric counts delivered orders only.
8. Never invent statistics or change the supplied counts.
9. Clearly separate each observation from its recommendation.
10. If a conclusion cannot be supported by the supplied data, state that limitation.
11. Give practical recommendations without presenting them as proven results.

Use this exact structure:

Insight 1: [Short title]
Observation: [Finding supported by the data]
Recommendation: [Practical next step]

Insight 2: [Short title]
Observation: [Finding supported by the data]
Recommendation: [Practical next step]

Insight 3: [Short title]
Observation: [Finding supported by the data]
Recommendation: [Practical next step]

Insight 4: [Short title]
Observation: [Finding supported by the data]
Recommendation: [Practical next step]
`.trim(),
        },
        {
          role: "user",
          content: `Analyze these actual database metrics:\n${JSON.stringify(
            businessData,
            null,
            2
          )}`,
        },
      ],
      temperature: 0.2,
    });

    res.json({
      success: true,
      insights: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("AI insights error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to generate AI insights.",
    });
  }
};

module.exports = {
  getAIInsights,
};
