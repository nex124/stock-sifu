import { NextResponse } from "next/server";
import { getMarketSummary, enrichMarketData } from "@/lib/stocks";

let cache: any = null;

export async function GET() {
  try {
    const rawData = await getMarketSummary("daily");
    const enrichedData = await enrichMarketData(rawData);

    cache = enrichedData;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cron failed:", error);
    return NextResponse.json({ error: "Cron failed" }, { status: 500 });
  }
}

export function getCachedData() {
  return cache;
}
