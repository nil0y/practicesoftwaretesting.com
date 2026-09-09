import {test} from './fixtures'; // Because we'll use this custom fixture in this test file.
import {expect} from '@playwright/test'; // Default expect from Playwright for assertions

test('user can see account page after login', async ({loggedInPage}) => {
    await expect(loggedInPage).toHaveURL(/account/); 
    //using loggedInPage instead of page because we are using custom fixture for login.
});