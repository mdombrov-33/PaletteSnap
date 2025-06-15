module.exports = {
  safelist: ['text-success', 'text-destructive'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        border: 'var(--border)',
        destructive: 'var(--destructive)',
        success: 'var(--success)',
      },
      borderColor: {
        ring: 'var(--ring)',
        border: 'var(--border)',
      },
      ringColor: {
        ring: 'var(--ring)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
    },
  },
}
