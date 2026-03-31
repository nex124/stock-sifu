import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { symbol, name } = body;

    if (!symbol || !name) {
      return NextResponse.json({ error: 'Missing symbol or name' }, { status: 400 });
    }

    // Mock AI logic
    const explanations = [
      `${name} (${symbol}) is showing strong momentum due to positive market sentiment and institutional buying.`,
      `Investors are reacting to recent regulatory changes affecting the sector, impacting ${symbol}.`,
      `Technical indicators suggest an oversold condition for ${symbol}, potentially attracting value seekers.`,
      `${name} continues to face headwinds from global supply chain issues, as seen in recent price action.`
    ];

    const randomExplanation = explanations[Math.floor(Math.random() * explanations.length)];

    // Simulate AI generation time
    await new Promise((resolve) => setTimeout(resolve, 1200));

    return NextResponse.json({ explanation: randomExplanation });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
