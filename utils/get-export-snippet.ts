import { ExportFormat } from '@/types/enums'
import { FullColorRoles } from '@/types/types'

export function getSnippet(format: ExportFormat, colors: FullColorRoles) {
  const fg = Array.isArray(colors.foreground) ? colors.foreground : []
  const foreground = fg[0] ?? ''
  const foregroundSecondary = fg[1] ?? ''
  const foregroundTertiary = fg[2] ?? ''

  switch (format) {
    case ExportFormat.Tailwind:
      return `module.exports={theme:{extend:{colors:{
  primary:'${colors.primary}',
  background:'${colors.background}',
  foreground:'${foreground}',
  foregroundSecondary:'${foregroundSecondary}',
  foregroundTertiary:'${foregroundTertiary}'
}}}}`

    case ExportFormat.TailwindCSSVars:
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
      return `:root {
  --primary: ${colors.primary};
  --background: ${colors.background};
  --foreground: ${foreground};
  --foreground-secondary: ${foregroundSecondary};
  --foreground-tertiary: ${foregroundTertiary};
}`

    case ExportFormat.JSON:
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
      return `export const colors = {
  primary: '${colors.primary}',
  background: '${colors.background}',
  foreground: ['${foreground}', '${foregroundSecondary}', '${foregroundTertiary}'],
};`

    case ExportFormat.SCSS:
      return `$primary: ${colors.primary};
$background: ${colors.background};
$foreground: ${foreground};
$foreground-secondary: ${foregroundSecondary};
$foreground-tertiary: ${foregroundTertiary};`

    case ExportFormat.POSTCSS:
      return `:root {
  --primary: ${colors.primary};
  --background: ${colors.background};
  --foreground: ${foreground};
  --foreground-secondary: ${foregroundSecondary};
  --foreground-tertiary: ${foregroundTertiary};
}`

    case ExportFormat.StyledComponents:
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
      const _exhaustiveCheck: never = format
      return _exhaustiveCheck
  }
}
