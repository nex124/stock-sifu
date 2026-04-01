import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getMarketSummary, enrichMarketData } from "@/lib/stocks";
import { getCachedData } from "@/app/api/cron/route";

export const maxDuration = 10;

export async function GET() {
  try {
    // Fetching from local JSON for testing/mocking
    const jsonPath = path.join(process.cwd(), "app/api/stocks_data.json");
    const jsonData = await fs.readFile(jsonPath, "utf-8");
    const stocksData = JSON.parse(jsonData);
    
    console.log("Serving from local JSON file");
    return NextResponse.json(stocksData);

    /* 
    // Logic for live data fetching (currently disabled)
    const cached = getCachedData();

    if (cached) {
      console.log("Serving from cache");
      return NextResponse.json(cached);
    }

    // On cache miss, fetch fresh data directly
    console.log("Cache miss, fetching and enriching market data...");
    const rawData = await getMarketSummary("daily");
    const enrichedData = await enrichMarketData(rawData);
    return NextResponse.json(enrichedData);
    */
  } catch (error) {
    console.error("Stocks API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch market data" },
      { status: 500 },
    );
  }
}
