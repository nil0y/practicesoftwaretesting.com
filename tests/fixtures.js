 // Importing default test as base to extend it with custom fixtures
import {test as base} from '@playwright/test';

//We are creating custom fixture for login & will be using loggedInPage instead of page in our tests.
export const test = base.extend({
    loggedInPage: async ({page}, use) => {
        await page.goto('https://practicesoftwaretesting.com/auth/login');
        await page.getByPlaceholder('Your email').fill('customer@practicesoftwaretesting.com');
        await page.getByPlaceholder('Your password').fill('welcome01');
        await page.getByRole('button', {name: 'Login'}).click();

        await use(page); // Fixture is now ready to use in tests
    } 
    /*this is also an object literal, so we can add more fixtures here in future if we want to.
    And we need to use comma here to separate the next fixture if we want to add more fixtures in future.
    Or, if we do not wa
    */
});