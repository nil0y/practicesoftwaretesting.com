    export class HomePage {
        constructor (page) {
            this.page = page;
            this.searchInput = page.getByRole('textbox', {name: 'Search'});
            this.searchButton = page.getByRole('button', {name: 'Search'});
            this.firstProduct = page.locator('.card').first();
            this.hammerCheckbox = page.getByLabel('Hammer');
            this.sortDropdown = page.getByLabel('Sort');
            this.searchResult = page.getByTestId('search-result-count');
        }
        async goto() {
            await this.page.goto('https://practicesoftwaretesting.com/');
        }

        async search(productName) {
            await this.searchInput.fill(productName);
            await this.searchButton.click();
        }
    }