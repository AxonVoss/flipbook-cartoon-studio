/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cartoon: {
          yellow: '#FFD93D',
          blue: '#4ECDC4',
          red: '#FF6B6B',
          green: '#6BCB77',
          purple: '#A855F7',
          orange: '#FF8C42',
          dark: '#2D3436',
          light: '#FFEAA7',
        },
      },
      fontFamily: {
        cartoon: ['Comic Sans MS', 'Chalkboard SE', 'cursive'],
      },
      borderWidth: {
        3: '3px',
        5: '5px',
      },
      boxShadow: {
        cartoon: '4px 4px 0px #2D3436',
        'cartoon-lg': '6px 6px 0px #2D3436',
        'cartoon-xl': '8px 8px 0px #2D3436',
      },
      borderRadius: {
        cartoon: '16px',
        'cartoon-lg': '24px',
      },
    },
  },
  plugins: [],
}
