import {test, expect} from '@playwright/test';

test('homepage visual test', async ({page}) => {
    await page.goto('https://practicesoftwaretesting.com/');
    await page.waitForSelector('.card'); // wait till products appear
    await expect(page).toHaveScreenshot('homepage.png', {
        maxDiffPixelRatio: 0.01, // 1% difference allow (Threshhold)
    });
});

// Run the tests: npx playwright test visual.spec.js --project=chromium --reporter=list

// Create baseline SS: npx playwright test visual.spec.js --project=chromium --update-snapshots

// Without a base SS the test will fail.

/*
Musking helps ignoring comparisons for dynamic elements like, timestamps, ads, user avatar, dynamic prices etc.

test('homepage visual test', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');
    await expect(page).toHaveScreenshot('homepage.png', {
        mask: [page.locator('.some-dynamic-element')],
    });
});
*/

test('visual regression test', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');

    await page.waitForSelector('.card'); // wait till products appear
    
    // Intentionally changing UI element (Background color)
    await page.evaluate(() => {
        document.body.style.backgroundColor = 'red';
    });
    
    await expect(page).toHaveScreenshot('homepage.png', {
        maxDiffPixelRatio: 0.01,
    });
});