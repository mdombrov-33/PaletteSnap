import { ExportFormat } from '@/types/enums'

export function getSnippet(format: ExportFormat, colors: string[]) {
  switch (format) {
    case ExportFormat.Tailwind:
      const colorsObj = colors.map((c, i) => `    custom${i + 1}: '${c}'`).join(',\n')
      return `module.exports = {
  theme: {
    extend: {
      colors: {
${colorsObj}
      },
    },
  },
}
`
    case ExportFormat.CSS:
      return `:root {\n${colors.map((c, i) => `  --color-${i}: ${c};`).join('\n')}\n}`
    case ExportFormat.JSON:
      return JSON.stringify(colors, null, 2)
    case ExportFormat.JS:
      return `export const colors = [${colors.map((c) => `'${c}'`).join(', ')}];`
    case ExportFormat.SCSS:
      return colors.map((c, i) => `$color-${i}: ${c};`).join('\n')
    case ExportFormat.POSTCSS:
      return `:root {\n${colors.map((c, i) => `  --color-${i}: ${c};`).join('\n')}\n}`
    case ExportFormat.StyledComponents:
      return `import styled from 'styled-components';

const Colors = styled.div\`
${colors.map((c, i) => `  --color${i}: ${c};`).join('\n')}
\`;

export default Colors;
`
    default:
      const _exhaustiveCheck: never = format
      return _exhaustiveCheck
  }
}
