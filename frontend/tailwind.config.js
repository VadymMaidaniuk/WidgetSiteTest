module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0a0a0f',
        'bg-secondary': '#12121a',
        'primary': '#8b5cf6',
        'secondary': '#06b6d4',
        'accent': '#f59e0b',
      },
    },
  },
  plugins: [],
}
