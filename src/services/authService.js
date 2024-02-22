class Auth {
    constructor() {
        this.authenticated = false;
    }

    async login(credentials) {
        try {
            let response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });
            const responseData = await response.json();
            if (responseData.success) {
                this.authenticated = true;
            }
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }

    async register(credentials) {
        try {
            let response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });
            const responseData = await response.json();
            if (responseData.success) {
                this.authenticated = true;
            }
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new Auth();