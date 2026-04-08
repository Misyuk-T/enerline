/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1565C0',
        secondary: '#2E7D32',
        accent: '#43A047',
        background: '#FFFFFF',
        surface: '#F5F7FA',
        text: '#1A1A2E',
        muted: '#6B7280',
        border: '#E5E7EB',
      },
      boxShadow: {
        soft: '0 2px 12px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        card: '8px',
        button: '4px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        container: '1180px',
      },
      backgroundImage: {
        'hero-overlay':
          'linear-gradient(135deg, rgba(21, 101, 192, 0.85), rgba(46, 125, 50, 0.72))',
      },
    },
  },
  plugins: [],
};
