import flowbite from 'flowbite/plugin';

const config = {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

  plugins: [flowbite],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        primary_dark: '#0d1b2a',
        secondary_dark: '#06d6a0',
        ink_dark: '#fff',
        primary_light: '#fff',
        secondary_light: '#06d6a0',
        ink_light: '#000',
      },

    }
  }
};

module.exports = config;