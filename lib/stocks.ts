import { fetchQuotes } from "./yahoo";
import { Stock, MarketSummary } from "@/types/stock";
import { generateInsight } from "./ai";
import { fetchNews, delay } from "./news";

const SYMBOLS = [
  "1155.KL", // Maybank
  "1295.KL", // Public Bank
  "1023.KL", // CIMB
  "5347.KL", // Tenaga
  "6033.KL", // PetGas
  "5225.KL", // IHH
  "8869.KL", // Press Metal
  "6888.KL", // Axiata
  "6947.KL", // Digi
  "6012.KL", // Maxis
  "5183.KL", // PetChem
  "4065.KL", // PPB
  "2445.KL", // KLK
  "1961.KL", // IOI
  "3182.KL", // Genting
  "4707.KL", // Nestle
  "7113.KL", // Top Glove
  "5168.KL", // Hartalega
  "3816.KL", // MISC
  "4197.KL", // Sime Darby
];

export async function getMarketSummary(range: string) {
  const quotes = await fetchQuotes(SYMBOLS);

  const stocks: Stock[] = quotes.map((q: any) => ({
    name: q.shortName || q.symbol.split('.')[0],
    fullName: q.longName || q.shortName || q.symbol,
    symbol: q.symbol,
    currentPrice: q.regularMarketPrice || 0,
    percentageChange: q.regularMarketChangePercent || 0,
    aiExplanation: `Performance reflects ${range} market trends and sectoral investor sentiment.`,
  }));

  const sorted = stocks.sort((a, b) => b.percentageChange - a.percentageChange);

  return {
    gainers: sorted.filter((s) => s.percentageChange > 0).slice(0, 5),
    losers: sorted
      .filter((s) => s.percentageChange < 0)
      .reverse()
      .slice(0, 5),
    lastUpdated: new Date().toISOString(),
  };
}

export async function enrichMarketData(data: MarketSummary) {
  const movers = [...data.gainers, ...data.losers];

  for (const stock of movers) {
    console.log(`Processing AI insight for ${stock.name}...`);
    const news = await fetchNews(stock.name);

    // Add a small delay between each news and AI fetch to avoid hitting rate limits
    await delay(1000);

    const insight = await generateInsight(
      stock.name,
      stock.percentageChange,
      news,
    );

    stock.aiExplanation = insight;
  }

  data.lastUpdated = new Date().toISOString();
  return data;
}
