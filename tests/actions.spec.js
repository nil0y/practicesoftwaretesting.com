import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Actions', () => {
    let homepage;

    test.beforeEach(async ({page}) => {
        homepage = new HomePage(page);
        await homepage.goto();
    });

    // Clicking on an element
    test('click', async ({page}) => {
        await homepage.firstProduct.click();
    });

    // Fill and type
    test('fill and type', async ({page}) => {
        await homepage.search('Pliers');
    });

    // Keyboard press
    test ('keyboard press', async ({page}) => {
        
        await homepage.searchInput.fill('Pliers');
        await homepage.searchInput.press('Enter');
    });

    // Checking items from a checkbox list
    test('checkbox', async ({page}) => {
        await homepage.hammerCheckbox.check();
    });

    // Selecting an item from a dropdown list
    test('Dropdown', async ({page}) => {
        await homepage.sortDropdown.selectOption('Price (Low - High)');
    });

    // Hovering over an element
    test('hover', async ({page}) => {
        await homepage.firstProduct.hover();
    });
});