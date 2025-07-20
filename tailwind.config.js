import plugin from 'tailwindcss/plugin';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      colors: {
        main: '#62FFBB',
        sub01: '#D0FFEB',
        sub02: '#EFFFF8',
        sub03: '#FFFACC',
        point: '#FFE600',
        black: '#111411',
        gray4: '#393C39',
        gray3: '#757875',
        gray2: '#B1B4B1',
        gray1: '#EDF0ED',
        white: '#FCFFFC'
      },
      fontSize: {
        '30': '30px',
        '24': '24px',
        '20': '20px',
        '16': '16px',
        '14': '14px',
        '12': '12px',
      }
    },

  },
  plugins: [
    plugin(function ({ addComponents}){
      addComponents({
        '.head-01': { fontSize: '30px', fontWeight: '700' },
        '.title-01': { fontSize: '24px', fontWeight: '700' },
        '.title-02': { fontSize: '20px', fontWeight: '700' },
        '.title-03': { fontSize: '16px', fontWeight: '600' }, 
        '.body-01': { fontSize: '20px', fontWeight: '400' },  
        '.body-02': { fontSize: '16px', fontWeight: '500' },  
        '.caption-01': { fontSize: '14px', fontWeight: '500' },
        '.caption-02': { fontSize: '12px', fontWeight: '500' },
      })
    })
  ],
}