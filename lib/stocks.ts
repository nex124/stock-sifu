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
    name: q.shortName || q.symbol.split(".")[0],
    fullName: q.longName || q.shortName || q.symbol,
    symbol: q.symbol,
    currentPrice: q.regularMarketPrice || 0,
    percentageChange: q.regularMarketChangePercent || 0,
    aiExplanation: `Performance reflects ${range} market trends and sectoral investor sentiment.`,
  }));

  const sorted = stocks.sort((a, b) => b.percentageChange - a.percentageChange);

  return {
    gainers: sorted.filter((s) => s.percentageChange > 0).slice(0, 3),
    losers: sorted
      .filter((s) => s.percentageChange < 0)
      .reverse()
      .slice(0, 3),
    lastUpdated: new Date().toISOString(),
  };
}

export async function enrichMarketData(data: MarketSummary) {
  const movers = [...data.gainers, ...data.losers];

  console.log(
    `Processing AI insights for ${movers.length} stocks sequentially...`,
  );

  // for (const stock of movers) {
  try {
    const news = await fetchNews(movers[1].name);
    console.log(news);
    const insight = await generateInsight(
      movers[1].name,
      movers[1].percentageChange,
      news,
    );
    movers[1].aiExplanation = insight;
  } catch (error) {
    console.error(`Failed to enrich ${movers[1].name}:`, error);
  }
  await delay(500);
  // }

  data.lastUpdated = new Date().toISOString();

  console.log(data);
  return data;
}
