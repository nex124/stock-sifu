export async function generateInsight(
  stockName: string,
  change: number,
  news: string[],
) {
  if (!news.length) {
    return "No major news detected; movement likely driven by general market sentiment.";
  }

  const prompt = `
You are a financial news summarizer.

Stock: ${stockName}
Price Change: ${change}%

News Headlines:
${news.map((n, i) => `${i + 1}. ${n}`).join("\n")}

Task:
Explain in 1–2 short sentences why the stock might be moving.

Rules:
- Use only the provided news
- Do NOT speculate
- Do NOT give investment advice
- Keep it simple and factual
- Maximum 2 sentences
`;

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 150,
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`OpenRouter API Error (${res.status}):`, errorText);
      return "Unable to generate insight at this moment.";
    }

    const data = await res.json();
    console.log(data);
    const content = data.choices?.[0]?.message?.content?.trim();

    if (!content) {
      console.warn("AI returned empty content:", data);
      return "No clear insight could be derived from the current news.";
    }

    return content;
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "Error generating insight.";
  }
}
