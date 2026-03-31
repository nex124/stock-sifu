import { NextResponse } from "next/server";
import { getMarketSummary, enrichMarketData } from "@/lib/stocks";
import { getCachedData } from "@/app/api/cron/route";

export async function GET() {
  try {
    const cached = getCachedData();

    if (cached) {
      console.log("Serving from cache");
      return NextResponse.json(cached);
    }

    // If no cache, return an error instead of triggering the AI model
    console.log("Cache miss, data not available.");
    return NextResponse.json(
      { error: "Market data is currently being updated. Please check back later." },
      { status: 503 }
    );
  } catch (error) {
    console.error("Stocks API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch market data" },
      { status: 500 },
    );
  }
}
