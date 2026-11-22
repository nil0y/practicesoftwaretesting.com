    import {test as setup, request } from '@playwright/test';

    const authFile = 'playwright/.auth/user.json';

    setup('authenticate - Login using API', async ({page}) => {
        const apiContext = await request.newContext();
        const response = await apiContext.post(`${process.env.API_URL}/users/login`, {
        data: {
            email: process.env.CUSTOMER_EMAIL || 'customer@practicesoftwaretesting.com',
            password: process.env.CUSTOMER_PASSWORD || 'welcome01'
        }
    });

    const responseBody = await response.json();
    const token = responseBody.access_token;
    await apiContext.dispose();

    await page.goto(process.env.BASE_URL || 'https://practicesoftwaretesting.com');
    await page.evaluate((t) => {
        localStorage.setItem('token', t);
    }, token);

        // Save the authenticated state after login.
        await page.context().storageState({path: authFile});
    });