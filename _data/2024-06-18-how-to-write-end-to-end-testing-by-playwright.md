# How to write End-to-End testing by Playwright

End-to-End (E2E) Testing involves testing user flows in an environment that simulates real user scenarios, like the browser. Playwright is my favorite testing framework that lets us automate Chromium, Firefox, and WebKit with a single API. 

## Setup

First, to install Playwright, run the following command:

```bash
npm init playwright@latest
```

This will take us through a series of prompts to setup and configure Playwright for our project, including adding a `playwright.config` file. Please refer to the [Playwright installation guide](https://playwright.dev/docs/intro#installing-playwright) for the step-by-step guide.

## Creating our first Playwright E2E test

```javascript
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  const text = "David Li Blog";
  
  // Start from the index page (the baseURL is set in the playwright.config)
  await page.goto('/');
  // The new page should contain a title with the text
  await expect(page).toHaveTitle(new RegExp(text));
  // The new page should contain a header with the text
  await expect(page.getByRole('heading', { name: text })).toBeVisible();
})
```

This test is a simple verification of the index page, but it’s a good starting point to add more tests.

## Running our Playwright tests

To run Playwright tests, run the following command:

```bash
npx playwright test
```

By default tests will be run on all 3 browsers, chromium, firefox and webkit using 3 workers. Tests are run in headless mode meaning no browser will open up when running the tests. 

## Running Playwright on Github Actions

When installing Playwright with `npm init playwright@latest` we are given the option to add a GitHub Actions workflow. This creates a `playwright.yml` file inside a `.github/workflows` folder containing everything we need so that our tests run on each push and pull request into the main branch.

One point is Playwright requires our Next.js server to be running.  We can update the default Playwright configuration to achieve this easily. We will use the `webServer` config, which is already included in the default config but commented out. Here is the updated config:

```javascript
module.exports = defineConfig({
  // other configurations

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'list',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Run our local dev server before starting the tests */
  webServer: {
    command: 'npm run build && npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
```

## Conclusion

From now on, the tests will run automatically whenever we push new code to the main branch, allowing us to confidently ensure that our application functions as expected in real-world scenarios.
