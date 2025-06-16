import { ExportFormat } from '@/types/enums'
import { FullColorRoles } from '@/types/types'

// This function takes the format we want and our colors,
// then returns a snippet of code that matches that format.
// So basically: "Let’s get these colors in Tailwind, CSS, JSON, etc."
export function getSnippet(format: ExportFormat, colors: FullColorRoles) {
  // Foreground might be an array or not, so let's make sure it’s always an array (or empty)
  const fg = Array.isArray(colors.foreground) ? colors.foreground : []
  // We'll grab up to three foreground colors here, falling back to empty strings if they’re missing
  const foreground = fg[0] ?? ''
  const foregroundSecondary = fg[1] ?? ''
  const foregroundTertiary = fg[2] ?? ''

  // Here’s where we handle each export format.
  // If we add more formats later, we need to update this switch statement.
  switch (format) {
    case ExportFormat.Tailwind:
      // This one outputs a Tailwind config snippet with colors plugged in directly
      return `module.exports={theme:{extend:{colors:{
  primary:'${colors.primary}',
  background:'${colors.background}',
  foreground:'${foreground}',
  foregroundSecondary:'${foregroundSecondary}',
  foregroundTertiary:'${foregroundTertiary}'
}}}}`

    case ExportFormat.TailwindCSSVars:
      // For this one, we use CSS vars inside Tailwind config, plus define those vars in :root
      return `module.exports={theme:{extend:{colors:{
  primary:'var(--primary)',
  background:'var(--background)',
  foreground:'var(--foreground)',
  foregroundSecondary:'var(--foreground-secondary)',
  foregroundTertiary:'var(--foreground-tertiary)'
}}}}

:root {
  --primary: ${colors.primary};
  --background: ${colors.background};
  --foreground: ${foreground};
  --foreground-secondary: ${foregroundSecondary};
  --foreground-tertiary: ${foregroundTertiary};
}`

    case ExportFormat.CSS:
      // Just basic CSS variables inside :root for general CSS use
      return `:root {
  --primary: ${colors.primary};
  --background: ${colors.background};
  --foreground: ${foreground};
  --foreground-secondary: ${foregroundSecondary};
  --foreground-tertiary: ${foregroundTertiary};
}`

    case ExportFormat.JSON:
      // Here we turn our colors into JSON — handy for APIs or saving data
      return JSON.stringify(
        {
          primary: colors.primary,
          background: colors.background,
          foreground: [foreground, foregroundSecondary, foregroundTertiary],
        },
        null,
        2
      )

    case ExportFormat.JS:
      // A plain JavaScript export we can import elsewhere in our projects
      return `export const colors = {
  primary: '${colors.primary}',
  background: '${colors.background}',
  foreground: ['${foreground}', '${foregroundSecondary}', '${foregroundTertiary}'],
};`

    case ExportFormat.SCSS:
      // SCSS variables for when we’re working with Sass stylesheets
      return `$primary: ${colors.primary};
$background: ${colors.background};
$foreground: ${foreground};
$foreground-secondary: ${foregroundSecondary};
$foreground-tertiary: ${foregroundTertiary};`

    case ExportFormat.POSTCSS:
      // PostCSS supports CSS variables, so this is similar to plain CSS :root
      return `:root {
  --primary: ${colors.primary};
  --background: ${colors.background};
  --foreground: ${foreground};
  --foreground-secondary: ${foregroundSecondary};
  --foreground-tertiary: ${foregroundTertiary};
}`

    case ExportFormat.StyledComponents:
      // Styled-components snippet — sets CSS variables inside a styled div component
      return `import styled from 'styled-components';

const Colors = styled.div\`
  --primary: ${colors.primary};
  --background: ${colors.background};
  --foreground: ${foreground};
  --foreground-secondary: ${foregroundSecondary};
  --foreground-tertiary: ${foregroundTertiary};
\`;

export default Colors;
`

    default:
      // This is here to make sure we didn’t forget to handle a format — TypeScript will complain if we did
      const _exhaustiveCheck: never = format
      return _exhaustiveCheck
  }
}
