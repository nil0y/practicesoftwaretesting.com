import {expect} from '@playwright/test';
import {test} from './fixtures';

test.describe('Actions', () => {

    // Clicking on an element
    test('click', async ({homePage}) => {
        await homePage.firstProduct.click();
    });

    // Fill and type
    test('fill and type', async ({homePage}) => {
        await homePage.search('Pliers');
    });

    // Keyboard press
    test ('keyboard press', async ({homePage}) => {
        
        await homePage.searchInput.fill('Pliers');
        await homePage.searchInput.press('Enter');
    });

    // Checking items from a checkbox list
    test('checkbox', async ({homePage}) => {
        await homePage.hammerCheckbox.check();
    });

    // Selecting an item from a dropdown list
    test('Dropdown', async ({homePage}) => {
        await homePage.sortDropdown.selectOption('Price (Low - High)');
    });

    // Hovering over an element
    test('hover', async ({homePage}) => {
        await homePage.firstProduct.hover();
    });
});