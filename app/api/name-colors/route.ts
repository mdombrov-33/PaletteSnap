import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { colors } = await request.json()

  const response = await fetch('https://palettesnap.onrender.com/name-colors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ colors }),
  })

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch color names' }, { status: 500 })
  }

  const data = await response.json()

  return NextResponse.json(data)
}
