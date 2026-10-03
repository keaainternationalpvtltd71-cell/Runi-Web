export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#0168B3', dark: '#0B5591', deep: '#083F6B', light: '#2073B5', tint: '#E8F1F9' },
        steel: { 50: '#F5F6F7', 100: '#EDEEF0', 200: '#DFE0E2', 300: '#C2C3C5', 400: '#A4A3A8', 600: '#6B6C71', 800: '#2B2C30', 900: '#17181B' },
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'] },
      maxWidth: { wrap: '1760px' },
      borderRadius: { card: '6px' },
    },
  },
  plugins: [],
};
