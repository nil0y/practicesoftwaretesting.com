import { test, expect } from '@playwright/test';

test('explore locators', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');
    await page.getByRole('textbox', { name: 'Search' }).fill('Pliers');
    await page.getByRole('button', {name: 'Search'}).click();
    
    // await page.getByText('Pliers').click();
    // This will not work because the text is available in multiple elements. So we can use getByTestId, a more specific locator.
    // await page.getByTestId('product-01M19PCYQ5QBB6S2894H5FSYKF').click();
    //Even better to use getbyText with first() to click the first element with the text 'Pliers'
    await page.getByText('Pliers').first().click();
});

test('Login form', async ({page}) => {
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    await page.getByLabel('Email').fill('customer@practicesoftwaretesting.com');
    await page.getByTestId('password').fill('welcome01');
    await page.getByRole('button', {name: 'Login'}).click();
});

test('css selectors', async ({page}) => {
    await page.goto('https://practicesoftwaretesting.com/');
    await page.locator('.card').first().click();
});

test('chaining and filtering', async ({page}) => {
    await page.goto('https://practicesoftwaretesting.com/');
    const price = await page.locator('.card')
    .filter({hasText: 'Pliers'})
    .getByTestId('product-price')
    .first()
    .textContent();
    console.log('Price: ', price);
});