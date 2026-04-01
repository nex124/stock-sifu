export async function generateInsight(
  stockName: string,
  change: number,
  news: string[],
  retry = false,
) {
  if (!news.length) {
    return "No major news detected; movement likely driven by general market sentiment.";
  }

  // 🔥 Limit news to reduce token usage
  const trimmedNews = news.slice(0, 3);

  const prompt = `
Stock: ${stockName}
Change: ${change}%

News:
${trimmedNews.map((n, i) => `${i + 1}. ${n}`).join("\n")}

Explain briefly (max 1 sentence) why the stock moved.
Use only the news. No speculation. No advice.
`;

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen/qwen3.6-plus-preview:free",
        messages: [
          {
            role: "system",
            content: "You are a concise financial news summarizer.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 120, // 🔥 smaller to prevent overthinking
        temperature: 0.3,
        reasoning: {
          effort: "minimal", // 🔥 CRITICAL FIX
        },
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`OpenRouter API Error (${res.status}):`, errorText);
      return "Unable to generate insight at this moment.";
    }

    const data = await res.json();
    const choice = data.choices?.[0];
    const content = choice?.message?.content?.trim();

    // 🔥 HANDLE FAIL CASES
    if (!content || choice?.finish_reason === "length") {
      console.warn("AI failed or truncated:", data);

      // ✅ Retry ONCE
      if (!retry) {
        console.log("Retrying insight generation...");
        return await generateInsight(stockName, change, news, true);
      }

      // ✅ Final fallback
      return "Stock movement appears linked to recent news, though no clear concise summary could be generated.";
    }

    return content;
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "Error generating insight.";
  }
}
