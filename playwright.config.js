// @ts-check
const { defineConfig, devices, chromium } = require('@playwright/test');


module.exports = defineConfig({
  testDir: './tests',
/* Maximum timeout */
timeout : 30 * 1000,
expect : {
  timeout: 5000
},

  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName : 'firefox',
    headless: false
    

  },

});

