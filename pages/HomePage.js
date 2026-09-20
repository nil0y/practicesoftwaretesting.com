    export class HomePage {
        constructor (page) {
            this.page = page;
        }
        async goto() {
            await this.page.goto('https://practicesoftwaretesting.com/');
        }

        async search(productName) {
            await this.page.getByRole('textbox', {name: 'Search'}).fill(productName);
            await this.page.getByRole('button', {name: 'Search'}).click();
        }
    }