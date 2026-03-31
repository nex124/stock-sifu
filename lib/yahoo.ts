import yahooFinance from "yahoo-finance2";

export async function fetchQuotes(symbols: string[]) {
  const yf = new yahooFinance();
  return yf.quote(symbols);
}
