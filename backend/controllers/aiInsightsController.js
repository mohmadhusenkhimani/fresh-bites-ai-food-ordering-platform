const groq = require("../config/groq");

const getAIInsights = async (req, res) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are an AI business analyst for a food delivery platform.",
        },
        {
          role: "user",
          content:
            "Generate 4 short business insights for a food delivery dashboard.",
        },
      ],
      temperature: 0.5,
    });

    res.json({
      success: true,
      insights: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAIInsights,
};