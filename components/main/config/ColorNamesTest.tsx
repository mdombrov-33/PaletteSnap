'use client'

import { useEffect, useState } from 'react'

export default function ColorNamesTest() {
  const [colors] = useState(['#43bb70', '#24643c', '#9ddbb4', '#6c9860', '#26492b'])
  const [colorNames, setColorNames] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchColorNames() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/name-colors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ colors }),
        })

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`)
        }

        const data = await res.json()
        setColorNames(data.color_names)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchColorNames()
  }, [colors])

  return (
    <div>
      <h2>Color Names Test</h2>
      {loading && <p>Loading color names...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {colorNames.map((name, i) => (
            <li key={i}>
              <span
                style={{
                  display: 'inline-block',
                  width: 16,
                  height: 16,
                  backgroundColor: colors[i],
                  marginRight: 8,
                  border: '1px solid #ccc',
                }}
              />
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
