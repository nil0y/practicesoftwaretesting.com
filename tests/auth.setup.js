import {test as setup} from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({page}) => {

    // Write the login steps.
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    await page.getByPlaceholder('Your email').fill('customer@practicesoftwaretesting.com');
    await page.getByPlaceholder('Your password').fill('welcome01');
    await page.getByRole('button', {name: 'Login'}).click();

    // Save the authenticated state after login.
    await page.context().storageState({path: authFile});
})