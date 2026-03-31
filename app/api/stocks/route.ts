import { NextResponse } from "next/server";
import { getMarketSummary, enrichMarketData } from "@/lib/stocks";
import { getCachedData } from "@/app/api/cron/route";

export async function GET(request: Request) {
  try {
    const cached = getCachedData();

    // If cache exists (we only cache 'daily' data)
    if (cached) {
      console.log("Serving from cache");
      return NextResponse.json(cached);
    }

    console.log("Cache miss, fetching fresh data...");
    const rawData = await getMarketSummary("daily");
    const enrichedData = await enrichMarketData(rawData);

    return NextResponse.json(enrichedData);
  } catch (error) {
    console.error("Stocks API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch market data" },
      { status: 500 },
    );
  }
}
