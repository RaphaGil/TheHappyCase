/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'navbar': '#f2f996',  // Define the navbar background color here
        
        // Button colors - Semantic button color system
        // Usage: bg-btn-primary, text-btn-primary-text, border-btn-primary-border
        // Hover: hover:bg-btn-primary-hover, hover:border-btn-primary-hover
        'btn-primary': '#111827',              // gray-900 - Primary dark button
        'btn-primary-hover': '#1f2937',        // gray-800 - Primary hover
        'btn-primary-text': '#ffffff',          // white - Primary text
        'btn-primary-border': '#111827',       // gray-900 - Primary border
        
        'btn-primary-blue': '#2563eb',          // blue-600 - Primary blue button
        'btn-primary-blue-hover': '#1d4ed8',   // blue-700 - Primary blue hover
        'btn-primary-blue-text': '#ffffff',     // white - Primary blue text
        'btn-primary-blue-border': '#2563eb',   // blue-600 - Primary blue border
        
        'btn-primary-blue-dark': '#1e40af',     // blue-800 - Primary blue dark
        'btn-primary-blue-dark-hover': '#1d4ed8', // blue-700 - Primary blue dark hover
        'btn-primary-blue-dark-text': '#ffffff',   // white - Primary blue dark text
        'btn-primary-blue-dark-border': '#1e40af', // blue-800 - Primary blue dark border
        
        'btn-secondary': '#e5e7eb',            // gray-200 - Secondary button
        'btn-secondary-hover': '#d1d5db',      // gray-300 - Secondary hover
        'btn-secondary-text': '#374151',       // gray-700 - Secondary text
        'btn-secondary-border': '#e5e7eb',      // gray-200 - Secondary border
        
        'btn-secondary-light': '#f3f4f6',      // gray-100 - Secondary light
        'btn-secondary-light-hover': '#e5e7eb', // gray-200 - Secondary light hover
        'btn-secondary-light-text': '#374151',  // gray-700 - Secondary light text
        'btn-secondary-light-border': '#f3f4f6', // gray-100 - Secondary light border
        
        'btn-success': '#16a34a',              // green-600 - Success button
        'btn-success-hover': '#15803d',        // green-700 - Success hover
        'btn-success-text': '#ffffff',          // white - Success text
        'btn-success-border': '#16a34a',       // green-600 - Success border
        
        'btn-light-blue': '#eff6ff',           // blue-50 - Light blue button
        'btn-light-blue-hover': '#dbeafe',      // blue-100 - Light blue hover
        'btn-light-blue-text': '#374151',       // gray-700 - Light blue text
        'btn-light-blue-border': '#bfdbfe',     // blue-200 - Light blue border
        
        'btn-light-gray': '#f9fafb',            // gray-50 - Light gray button
        'btn-light-gray-hover': '#f3f4f6',      // gray-100 - Light gray hover
        'btn-light-gray-text': '#4b5563',      // gray-600 - Light gray text
        'btn-light-gray-border': '#e5e7eb',     // gray-200 - Light gray border
        
        'btn-gray-medium': '#4b5563',          // gray-600 - Medium gray button
        'btn-gray-medium-hover': '#374151',    // gray-700 - Medium gray hover
        'btn-gray-medium-text': '#ffffff',     // white - Medium gray text
        'btn-gray-medium-border': '#4b5563',    // gray-600 - Medium gray border
      },
      fontFamily: {
        // Primary font - Inter (used for body text, buttons, etc.)
        'inter': [
          "'Inter'",
          '-apple-system',
          'BlinkMacSystemFont',
          "'Segoe UI'",
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          "'Helvetica Neue'",
          'sans-serif',
        ],
        // Display font - Fredoka One (used for headings/titles)
        'fredoka': [
          "'Fredoka One'",
          'cursive',
        ],
      },
      fontSize: {
        // Standard font sizes with line heights
        'xs': ['0.65rem', { lineHeight: '1rem', letterSpacing: '0.05em' }],      // 12px
        'sm': ['0.75rem', { lineHeight: '1.25rem', letterSpacing: '0.05em' }],   // 14px
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.05em' }],     // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0.05em' }],  // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0.05em' }],   // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '0.05em' }],      // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '0.05em' }], // 30px
        // 128px
        
        // Semantic font sizes for typography
        'title': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '0.05em' }],   // 36px - Main page titles (h1)
        'title-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '0.05em' }],      // 48px - Large hero titles
        'title-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '0.05em' }],   // 60px - Extra large hero titles
        'subtitle': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '0.05em' }], // 30px - Subtitles (h2)
        'subtitle-lg': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '0.05em' }], // 36px - Large subtitles
        'heading': ['1.5rem', { lineHeight: '2rem', letterSpacing: '0.05em' }],    // 24px - Section headings (h3)
        'heading-sm': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0.05em' }], // 20px - Small headings (h4)
        'body': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.3px' }],       // 16px - Body text (p)
        'body-sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.3px' }], // 14px - Small body text
        'body-lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0.3px' }], // 18px - Large body text
        'caption': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.05em' }],   // 12px - Captions and labels
      },
      letterSpacing: {
        // Custom letter spacing values
        'tight': '-0.025em',
        'normal': '0em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
        'title': '0.05em',      // Standard for titles
        'body': '0.3px',       // Standard for body text
        'heading': '1px',      // For headings with Fredoka One
      },
      fontWeight: {
        // Standard font weights
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.text-title': {
          'font-family': theme('fontFamily.fredoka'),
        },
        '.text-title-lg': {
          'font-family': theme('fontFamily.fredoka'),
        },
        '.text-title-xl': {
          'font-family': theme('fontFamily.fredoka'),
        },
        '.text-subtitle': {
          'font-family': theme('fontFamily.fredoka'),
        },
        '.text-subtitle-lg': {
          'font-family': theme('fontFamily.fredoka'),
        },
      };
      addUtilities(newUtilities);
    },
  ],
}

