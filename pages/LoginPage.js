export class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://practicesoftwaretesting.com/auth/login');
    }

    async login(email, password) {
        await this.page.getByPlaceholder('Your email').fill(email);
        await this.page.getByPlaceholder('Your password').fill(password);
        await this.page.getByRole('button', {name: 'Login'}).click();
    }
}