import { getReadableTextColor, getSmartColorRoles, isLight } from '@/utils/color-utils'
import { PaletteConfigProps } from '@/types/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'

function LivePreview({ colors }: PaletteConfigProps) {
  const { background, foreground, primary } = getSmartColorRoles(colors)
  const buttonTextColor = getReadableTextColor(primary)
  const badgeTextColor = getReadableTextColor(primary)
  const accentLabelColor = getReadableTextColor(background)
  const checkedBgColor = primary
  const uncheckedBgColor = isLight(background) ? '#ccc' : '#444'
  const thumbColor = isLight(primary) ? '#000' : '#fff'

  const [enabled, setEnabled] = useState(false)

  return (
    <div
      className="p-6 rounded-2xl shadow-xl max-w-md w-full border"
      style={{
        backgroundColor: background,
        color: foreground,
      }}
    >
      <Card className="w-full border-none shadow-none" style={{ background }}>
        <CardHeader>
          <CardTitle style={{ color: foreground }}>Live Preview</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label className="pb-2" htmlFor="name" style={{ color: foreground }}>
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
            <span style={{ color: foreground }}>Enable feature</span>
            <Switch
              checked={enabled}
              onCheckedChange={(checked) => setEnabled(checked)}
              checkedBgColor={checkedBgColor}
              uncheckedBgColor={uncheckedBgColor}
              thumbColor={thumbColor}
            />
          </div>

          <Button
            className="w-full"
            style={{
              backgroundColor: primary,
              color: buttonTextColor,
            }}
          >
            Save Changes
          </Button>

          <div className="text-sm flex items-center gap-2" style={{ color: accentLabelColor }}>
            Accent:
            <Badge
              style={{
                backgroundColor: primary,
                color: badgeTextColor,
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
