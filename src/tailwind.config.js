module.exports = {
  purge: {
    enabled: false,
  },
  theme: {},
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
    cursor: ['disabled'],
  },

  plugins: [
    // eslint-disable-next-line import/no-extraneous-dependencies, global-require
import '@tailwindcss/custom-forms'
  ],
};
