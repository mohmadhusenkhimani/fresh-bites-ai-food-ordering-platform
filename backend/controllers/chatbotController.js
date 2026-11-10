const groq = require("../config/groq");
const Food = require("../models/Food");
const Order = require("../models/Order");
const Coupon = require("../models/Coupon");

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_MESSAGES = 12;
const GROQ_CHAT_MODEL =
  process.env.GROQ_CHAT_MODEL || "openai/gpt-oss-120b";

const ORDERING_GUIDE = `
FreshBites ordering steps:
1. Browse menu at /food or home sections (Popular Foods, Hot Pizza).
2. Add items to cart from food cards or food detail pages.
3. Open cart at /cart, review items, apply coupon codes if available.
4. Proceed to checkout at /paymentForm (login/signup required).
5. Enter or select delivery address, choose COD or UPI, place order.
6. View orders at /my-orders and track at /track-order/{orderId}.
Shipping fee is typically ₹30 unless changed at checkout.
`.trim();

const inferIsVegetarian = (food) => {
  const text = `${food.name} ${food.description || ""}`.toLowerCase();
  if (/\b(chicken|mutton|fish|egg|non-veg|nonveg|meat|pepperoni|sausage|bacon|ham)\b/.test(text)) {
    return false;
  }
  if (/\b(veg|vegetarian|paneer|veggie|margherita)\b/.test(text)) {
    return true;
  }
  return null;
};

const buildFoodCatalog = async () => {
  const foods = await Food.find({ isAvailable: true })
    .select("name price category description")
    .sort({ category: 1, name: 1 })
    .lean();

  return foods.map((food) => ({
    id: String(food._id),
    name: food.name,
    priceInr: food.price,
    category: food.category,
    description: food.description || "",
    likelyVegetarian: inferIsVegetarian(food),
  }));
};

const buildActiveCoupons = async () => {
  const now = new Date();
  const coupons = await Coupon.find({
    isActive: true,
    expiryDate: { $gte: now },
  })
    .select("code discountType discountValue minimumAmount maximumDiscount")
    .limit(8)
    .lean();

  return coupons.map((c) => ({
    code: c.code,
    discountType: c.discountType,
    discountValue: c.discountValue,
    minimumAmount: c.minimumAmount,
    maximumDiscount: c.maximumDiscount,
  }));
};

const sanitizeOrdersForUser = (orders) =>
  orders.map((order) => ({
    orderId: String(order._id),
    status: order.status,
    paymentStatus: order.paymentStatus,
    paymentMethod: order.paymentMethod,
    totalInr: order.total,
    placedAt: order.createdAt,
    items: (order.items || []).map((item) => ({
      name: item.name,
      quantity: item.quantity,
      priceInr: item.price,
    })),
    recentTracking: (order.trackingHistory || []).slice(-4).map((step) => ({
      status: step.status,
      message: step.message,
      at: step.timestamp,
    })),
  }));

const buildUserOrders = async (userId) => {
  if (!userId) {
    return {
      authenticated: false,
      orders: [],
    };
  }

  const orders = await Order.find({ user: userId })
    .select(
      "status items total paymentStatus paymentMethod trackingHistory createdAt"
    )
    .sort({ createdAt: -1 })
    .limit(8)
    .lean();

  return {
    authenticated: true,
    orders: sanitizeOrdersForUser(orders),
  };
};

const validateHistory = (history) => {
  if (!history) {
    return [];
  }

  if (!Array.isArray(history)) {
    return null;
  }

  const cleaned = [];

  for (const entry of history.slice(-MAX_HISTORY_MESSAGES)) {
    if (
      !entry ||
      typeof entry.content !== "string" ||
      (entry.role !== "user" && entry.role !== "assistant")
    ) {
      continue;
    }

    const content = entry.content.trim();
    if (!content || content.length > MAX_MESSAGE_LENGTH) {
      continue;
    }

    cleaned.push({ role: entry.role, content });
  }

  return cleaned;
};

const sendChatMessage = async (req, res) => {
  try {
    if (!process.env.GROQ_API_KEY) {
      return res.status(503).json({
        success: false,
        message:
          "AI assistant is temporarily unavailable. Please try again later.",
      });
    }

    const rawMessage = req.body?.message;
    if (typeof rawMessage !== "string") {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const message = rawMessage.trim();
    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty.",
      });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Message must be at most ${MAX_MESSAGE_LENGTH} characters.`,
      });
    }

    const history = validateHistory(req.body?.history);
    if (history === null) {
      return res.status(400).json({
        success: false,
        message: "Invalid conversation history.",
      });
    }

    const [foodCatalog, coupons, orderContext] = await Promise.all([
      buildFoodCatalog(),
      buildActiveCoupons(),
      buildUserOrders(req.user?._id),
    ]);

    const contextPayload = {
      platform: "FreshBites",
      currency: "INR",
      foodCatalog,
      activeCoupons: coupons,
      orderingGuide: ORDERING_GUIDE,
      customerOrders: orderContext,
      mealHints: {
        breakfast: "Snacks, Drinks, lighter items",
        lunch: "Burger, Pizza, Snacks, Other",
        dinner: "Pizza, Burger, Other",
        snacks: "Snacks, Drinks",
      },
      dataRules: [
        "Only recommend foods listed in foodCatalog with accurate prices.",
        "If ingredients are not in description, say they are not listed and suggest checking the food detail page.",
        "For vegetarian requests, use likelyVegetarian and name/description; do not guess meat items as veg.",
        "Never invent orders, coupons, or menu items.",
        "Order status is only available for orders in customerOrders when authenticated.",
        "If user asks about another customer's order or private data, refuse politely.",
        "Do not share shipping addresses, emails, or phone numbers from orders.",
      ],
    };

    const systemPrompt = `
You are FreshBites AI Food Assistant — friendly, concise, and helpful for an Indian food delivery app.

Use ONLY the JSON context below for menu, prices, coupons, and order status.
${JSON.stringify(contextPayload)}

Behavior:
- Greet warmly when appropriate.
- Answer questions about food, recommendations (budget, veg/non-veg, meal time), ordering, and coupons.
- Guide users through the ordering flow using orderingGuide paths.
- If the user is not logged in and asks about their order status, ask them to log in and check /my-orders.
- If logged in but they have no matching orders, say you cannot find that order in their account.
- For unclear questions, ask a brief clarifying question.
- For unsupported requests (medical advice, unrelated topics), politely redirect to FreshBites food and ordering help.
- Keep answers readable: short paragraphs or bullet lists. Use ₹ for prices.
- Reply in plain text only. Do not wrap responses in JSON or markdown code fences unless listing menu items.
`.trim();

    const groqMessages = [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: message },
    ];

    const completion = await groq.chat.completions.create({
      model: GROQ_CHAT_MODEL,
      messages: groqMessages,
      temperature: 0.4,
      max_tokens: 1024,
    });

    const reply =
      completion.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I could not generate a response. Please try again.";

    return res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Chatbot error:", error.message);

    const status = error.status === 429 ? 429 : 503;

    return res.status(status).json({
      success: false,
      message:
        status === 429
          ? "AI assistant is busy. Please wait a moment and try again."
          : "AI assistant is temporarily unavailable. Please try again later.",
    });
  }
};

module.exports = {
  sendChatMessage,
};
