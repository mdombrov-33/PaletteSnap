import { FullColorRoles } from "@/types/types"
import { hexToLuminance } from "./luminance"

// This function takes a list of hex colors and tries to assign 'smart' roles like background, primary, and foreground
export function getSmartColorRoles(colors: string[]): FullColorRoles {
  // Sort colors from brightest to darkest based on luminance (descending order)
  const sorted = [...colors].sort((a, b) => hexToLuminance(b) - hexToLuminance(a))

  // We pick the darkest color as the background — makes sense, background usually should be dark for contrast
  const background = sorted[sorted.length - 1] || '#ffffff' // fallback to white if no colors

  // Remove background from the list so we don't pick it again
  const remaining = sorted.filter((c) => c !== background)

  // From the remaining colors, pick the middle luminance one as primary color (not too bright, not too dark)
  const primary = remaining[Math.floor(remaining.length / 2)] || '#1e40af' // fallback to blue-ish color

  // Remove primary color from the list too
  const withoutPrimary = remaining.filter((c) => c !== primary)

  // For foreground colors (used for text/icons), pick the 3 brightest remaining colors
  // We avoid primary and background because they have their own roles
  const foreground = withoutPrimary.slice(0, 3)

  // Return the roles as an object
  return { primary, background, foreground }
}
