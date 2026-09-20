 // Importing default test as base to extend it with custom fixtures
import {test as base, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

//We are creating custom fixture for login & will be using loggedInPage instead of page in our tests.
export const test = base.extend({
    loggedInPage: async ({page}, use) => {
        
        const loginPage = new LoginPage(page); // Created object of the LoginPage class
        await loginPage.goto(); //called goto func
        await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01'); // called login func with param

        await expect(page).toHaveURL(/account/); // verify that we are on the correct page after logging in

        await use(page); // Fixture is now ready to use in tests
    } 
    /*this is also an object literal, so we can add more fixtures here in future if we want to.
    And we need to use comma here to separate the next fixture if we want to add more fixtures in future.
    Or, if we do not wa
    */
});