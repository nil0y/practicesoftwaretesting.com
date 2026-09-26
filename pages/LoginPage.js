import {LOGIN_URL} from '../utils/testData.js';
export class LoginPage {
    constructor(page) {
        this.page = page;
        this.userEmail = page.getByPlaceholder('Your email');
        this.userPassword = page.getByPlaceholder('Your password');
        this.loginButton = page.getByRole('button', {name: 'Login'});
    }

    async goto() {
        await this.page.goto(LOGIN_URL);
    }

    async login(email, password) {
        await this.userEmail.fill(email);
        await this.userPassword.fill(password);
        await this.loginButton.click();
    }
}