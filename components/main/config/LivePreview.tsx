'use client'

import { getReadableTextColor, isLight } from '@/utils/colors'
import { LivePreviewProps } from '@/types/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'

function LivePreview({ primary, background, foreground }: LivePreviewProps) {
  const buttonTextColor = getReadableTextColor(primary)
  const badgeTextColor = getReadableTextColor(primary)
  const accentLabelColor = getReadableTextColor(background)
  const checkedBgColor = primary
  const uncheckedBgColor = isLight(background) ? '#ccc' : '#444'
  const thumbColor = isLight(primary) ? '#000' : '#fff'

  const mainForeground = Array.isArray(foreground) ? foreground[0] : foreground
  const [enabled, setEnabled] = useState(false)

  return (
    <div
      className="p-6 rounded-2xl shadow-xl max-w-md w-full border"
      style={{
        backgroundColor: background,
        color: mainForeground,
      }}
    >
      <Card className="w-full border-none shadow-none" style={{ background }}>
        <CardHeader>
          <CardTitle style={{ color: mainForeground }}>Live Preview</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label className="pb-2" htmlFor="name" style={{ color: mainForeground }}>
              Your Name
            </Label>
            <Input
              id="name"
              placeholder="e.g. John Doe"
              style={{
                backgroundColor: '#ffffff',
                color: '#000000',
                borderColor: primary,
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span style={{ color: mainForeground }}>Enable feature</span>
            <Switch
              checked={enabled}
              onCheckedChange={(checked) => setEnabled(checked)}
              checkedBgColor={checkedBgColor}
              uncheckedBgColor={uncheckedBgColor}
              thumbColor={thumbColor}
            />
          </div>

          <div className="space-y-1">
            <p style={{ color: foreground[0] }}>This is primary text</p>
            <p style={{ color: foreground[1] }}>This is secondary text</p>
            <p style={{ color: foreground[2], fontStyle: 'italic' }}>This is muted/help text</p>
          </div>

          <Button
            className="w-full"
            style={{
              backgroundColor: primary,
              color: buttonTextColor,
              fontWeight: 400,
            }}
          >
            Save Changes
          </Button>

          <div className="text-sm flex items-center gap-2" style={{ color: accentLabelColor }}>
            Primary:
            <Badge
              style={{
                backgroundColor: primary,
                color: badgeTextColor,
                fontWeight: 400, // normal weight
              }}
            >
              {primary}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LivePreview
