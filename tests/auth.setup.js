import {test as setup} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; // Imported the LoginPage class
import { users } from '../utils/credentials'; // user account details are stored here

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({page}) => {

    const loginPage = new LoginPage(page); // Created object of the LoginPage class
    await loginPage.goto(); //called goto func
    await loginPage.login(users.customer.email, users.customer.password); // called login func with param
    

    // Save the authenticated state after login.
    await page.context().storageState({path: authFile});
})