import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { colors } = await request.json()

    const response = await fetch('https://palettesnap.onrender.com/name-colors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ colors }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      return NextResponse.json(
        { error: errorData?.error || 'Failed to fetch color names' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in name-colors route:', error)
    return NextResponse.json({ error: 'Network error or request failed' }, { status: 503 })
  }
}
