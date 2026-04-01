import { NextResponse } from "next/server";
import { getMarketSummary, enrichMarketData } from "@/lib/stocks";

export const maxDuration = 10;

let cache: any = null;

export async function GET(request: Request) {
  // Security check for Vercel Cron
  if (
    process.env.NODE_ENV === "production" &&
    request.headers.get("x-vercel-cron") !== "1"
  ) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // Live fetching disabled to prevent reaching API limits during development
    /*
    const rawData = await getMarketSummary("daily");
    const enrichedData = await enrichMarketData(rawData);

    cache = enrichedData;
    */

    console.log("Cron triggered, but live data fetching is currently disabled.");
    return NextResponse.json({ success: true, message: "Live fetching disabled" });
  } catch (error) {
    console.error("Cron failed:", error);
    return NextResponse.json({ error: "Cron failed" }, { status: 500 });
  }
}

export function getCachedData() {
  return cache;
}
