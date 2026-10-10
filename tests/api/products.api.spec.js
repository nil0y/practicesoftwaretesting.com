import { test, expect } from '@playwright/test';
import { APIClient } from './APIClient.js';

test.describe('Tests for products API', () => {

    test.describe('Get requests', () => {

        test('get all products', async ({ request }) => {
            const client = new APIClient(request);

            const response = await client.getProductsByParam();

            const body = await response.json();
            // console.log('Response body:', JSON.stringify(body, null, 2));

            // Step 1: check if the response is an array or not
            expect(Array.isArray(body.data)).toBe(true);

            // Step 2: check if the array is not empty
            expect(body.data.length).toBeGreaterThan(0);
        });

        test('filter products by category using parameters', async ({ request }) => {

            const client = new APIClient(request);

            const response = await client.getProductsByParam({ by_category_slug: 'hammer' });

            const body = await response.json();

            expect(response.status()).toBe(200);
            expect(body.total).toBe(7);
            body.data.forEach(product => {
                expect(product.category.name).toBe('Hammer');
            });
        });

        test('get non-existent product', async ({ request }) => {
            const client = new APIClient(request);
            const response = await client.getProductById(999999999); // Assuming 999999 is a non-existent product ID

            console.log('Status: ', response.status());
            console.log('OK? : ', response.ok());

            const body = await response.json();
            console.log('Body: ', body);

            // Assertions
            expect(response.status()).toBe(404);
            expect(response.ok()).toBeFalsy();
            expect(body.message).toBe('Requested item not found');
        });

        // Chaining requests
        test('get first products details from hammer category', async ({ request }) => {
            const client = new APIClient(request);
            // Step 1: Get all products in the hammer category
            const listResponse = await client.getProductsByParam({ by_category_slug: 'hammer' });

            const listBody = await listResponse.json();

            // Step 2: Take the first product's ID
            const firstProductId = listBody.data[0].id;

            // Step 3: Get the details of the first product
            const detailResponse = await client.getProductById(firstProductId);
            const detailBody = await detailResponse.json();

            // Assertions
            expect(detailResponse.status()).toBe(200);
            expect(detailBody.id).toBe(firstProductId);
            expect(detailBody.category.name).toBe('Hammer');
        });
    })

    test.describe.skip('Post Requests', () => {

        test('create a new product', async ({ request }) => {
            const client = new APIClient(request);
            // Login to get token
            const loginResponse = await client.login('admin@practicesoftwaretesting.com', 'welcome01');

            // Create a new product
            const response = await client.createProduct({
                name: 'Test Hammer',
                price: 9.99,
                category_id: '01M45H8C3P1MHTVS1DA7F2JZZF',
                brand_id: '01M45H8BRX91HHKDHH1B75EGHX',
                is_location_offer: false,
                is_rental: false,
                product_image_id: '01M45H8C4ATPRFE9E4Y73K8W92'
            });
            const body = await response.json();

            // Assertions
            expect(response.status()).toBe(201);
            expect(body.name).toBe('Test Hammer');
            expect(body.id).toBeTruthy(); // Check if the product ID is returned and is truthy

            // Clean up: delete the created product after the test
            const deleteResponse = await client.deleteProduct(body.id);
            expect(deleteResponse.status()).toBe(204);
        });

        test('create a new product without required fields', async ({ request }) => {
            const client = new APIClient(request);
            const response = await client.createProduct({});
            const body = await response.json();

            expect(response.status()).toBe(422);
            expect(body.name[0]).toBe('The name field is required.');

        });
    });
});
// npx playwright test tests/api/products.api.spec.js --project=chromium --reporter=list