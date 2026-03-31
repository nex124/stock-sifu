"use client";

import React, { useState, useEffect } from "react";
import { MarketSummary } from "@/types/stock";
import StockList from "@/components/StockList";

export default function Dashboard() {
  const [data, setData] = useState<MarketSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/stocks?range=daily`);
      if (!response.ok) {
        throw new Error("Failed to fetch market data");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formattedTime = data?.lastUpdated
    ? new Date(data.lastUpdated).toLocaleTimeString("en-MY", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    : "--:--";

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Stock{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Sifu</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            The intelligent hub for Malaysian market insights. Analyzing trends
            and providing AI-driven explanations for today's market movers.
          </p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
            Last Updated:{" "}
            <span className="text-slate-600 dark:text-slate-300">
              {formattedTime}
            </span>
          </p>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid gap-10 md:grid-cols-2">
        <StockList
          title="Top Gainers"
          icon="📈"
          stocks={data?.gainers || []}
          isLoading={isLoading}
          error={error}
        />
        <StockList
          title="Top Losers"
          icon="📉"
          stocks={data?.losers || []}
          isLoading={isLoading}
          error={error}
        />
      </div>

      {/* Footer Design Element */}
      <div className="mt-24 text-center">
        <p className="text-sm font-medium text-slate-400 dark:text-slate-500">
          Powered by Stock Sifu Intelligence
        </p>
      </div>
    </main>
  );
}
