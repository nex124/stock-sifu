export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchNews(query: string) {
  try {
    const result = await fetch(
      `https://gnews.io/api/v4/search?q=${encodeURIComponent(`${query} Malaysia`)}&lang=en&max=5&apikey=${process.env.GNEWS_API_KEY}`,
    );

    if (!result.ok) {
      const errorText = await result.text();
      console.error("GNews error:", errorText);
      return [];
    }

    const data = await result.json();

    return data.articles?.map((article: any) => article.title) || [];
  } catch (error) {
    console.error("News fetch error:", error);
    return [];
  }
}
