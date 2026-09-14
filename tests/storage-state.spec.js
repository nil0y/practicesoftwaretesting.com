import {test, expect} from '@playwright/test';

// We will use the saved storage state.
test.use({storageState: 'playwright/.auth/user.json'});

// Now we will check if the user can access account page.
test('user can see account page using storage state', async ({page}) => {
    await page.goto('https://practicesoftwaretesting.com/account');
    await expect(page).toHaveURL(/account/);
});