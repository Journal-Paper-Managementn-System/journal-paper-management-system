import { BASE_URL } from "./helper";

class Auth {

    /**
     * Logs in the user with the provided credentials.
     * @param {Object} credentials - The user's login credentials.
     * @param {string} credentials.username - The username.
     * @param {string} credentials.password - The password.
     * @returns {Promise<Object>} - A promise that resolves to the response data from the server.
     */
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

    /**
     * Registers a user with the provided credentials.
     * @param {Object} credentials - The user credentials.
     * @param {string} credentials.username - The username of the user.
     * @param {string} credentials.password - The password of the user.
     * @returns {Promise<Object>} - A promise that resolves to the response data from the server.
     */
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

    /**
     * Retrieves user information using the provided access token.
     * @param {string} accessToken - The access token used for authentication.
     * @returns {Promise<Object>} - A promise that resolves to the user data.
     */
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

    /**
     * Verifies the email by making a POST request to the server.
     * @param {string} email - The email to be verified.
     * @returns {Promise<Object>} - A promise that resolves to the response data from the server.
     */
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

    /**
     * Resets the user's password.
     * @param {Object} credentials - The user's credentials.
     * @param {string} credentials.email - The user's email address.
     * @param {string} credentials.password - The user's new password.
     * @returns {Promise<Object>} - A promise that resolves to the response data.
     */
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

    /**
     * Updates the user profile.
     * @param {Object} data - The data to be sent in the request body.
     * @param {string} accessToken - The access token for authorization.
     * @returns {Promise<Object>} - A promise that resolves to the response data.
     */
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

    /**
     * Checks the user by sending a POST request to the server.
     * @param {Object} data - The data to be sent in the request body.
     * @param {string} data.email - The email of the user.
     * @returns {Promise<Object>} - A promise that resolves to the response data from the server.
     */
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

    /**
     * Retrieves the list of users from the server.
     * @param {string} accessToken - The access token for authentication.
     * @returns {Promise<Array>} - A promise that resolves to an array of user data.
     */
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