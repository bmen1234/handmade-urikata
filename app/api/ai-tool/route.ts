import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
  const { systemPrompt, userPrompt } = await req.json()
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1024, system: systemPrompt, messages: [{ role: 'user', content: userPrompt }] }),
    })
    const data = await response.json()
    return NextResponse.json({ result: data.content?.[0]?.text || '' })
  } catch {
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 })
  }
}
