export class APIClient {
    constructor(request) {
        this.request = request;
        this.baseURL = process.env.API_URL;
        this.token = null; // login token will be stored here after login
    }

    async login(email, password) {
        const response = await this.request.post(`${this.baseURL}/users/login`, {
            data: { email, password } // Object shorthand syntax for email and password
        });
        const body = await response.json();
        this.token = body.access_token; // Store the token for future requests
    }

    async getProductsByParam(params = {}) {
        return await this.request.get(`${this.baseURL}/products`, { params });
        // This method fetches products (with optional query parameters)
    }

    async getProductById(productId) {
        return await this.request.get(`${this.baseURL}/products/${productId}`);
        // This method fetches a product by its ID
    }

    async createProduct(data) {
        return await this.request.post(`${this.baseURL}/products`, { 
            data ,
            headers: { Authorization: `Bearer ${this.token}` }
        });
    }

    async deleteProduct(productId) {
        return await this.request.delete(`${this.baseURL}/products/${productId}`, {
            headers: { Authorization: `Bearer ${this.token}` }
        });
    }
}