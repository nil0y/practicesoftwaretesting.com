import {test} from './fixtures'; // Because we'll use this custom fixture in this test file.
import {expect} from '@playwright/test'; // Default expect from Playwright for assertions

test('user can see account page after login', async ({loggedInPage}) => {
    /* 
    We can use page.pause() to pause the test execution at the certain point and inspect the page in the browser.
    
    await loggedInPage.pause();


    */
    await expect(loggedInPage).toHaveURL(/account/); 
    //using loggedInPage instead of page because we are using custom fixture for login.
});

/*
 To debug this test step by step, run:
 => npx playwright test login.spec.js --debug
 
 To debug visually with full timeline and screenshots, run:
 => npx playwright test --ui
 */