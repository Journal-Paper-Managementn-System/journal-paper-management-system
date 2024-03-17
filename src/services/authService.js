import { BASE_URL } from "./helper";

class Auth {

    async login(credentials) {
        try {
            let response = await fetch(BASE_URL + "/auth/login", {
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
            let response = await fetch(BASE_URL + "/auth/register", {
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

    async getUser(accessToken) {
        try {
            const response = await fetch(BASE_URL + "/auth/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }

    async verifyEmail(email) {
        try {
            const response = await fetch(BASE_URL + "/auth/verify-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email }),
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }

    async resetPassword(credentials) {
        try {
            const response = await fetch(BASE_URL + "/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials),
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }

    async profileUpdate(data, accessToken) {
        try {
            const response = await fetch(BASE_URL + "/auth/update-profile", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                body: data
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }

    async checkUser(data) {
        try {
            const response = await fetch(BASE_URL + "/auth/check-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }

    async getUserList(accessToken) {
        try {
            const response = await fetch(BASE_URL + "/user/get-user-list", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new Auth();