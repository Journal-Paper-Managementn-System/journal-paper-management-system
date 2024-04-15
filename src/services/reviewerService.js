import { BASE_URL } from "./helper";

class Reviewer {
    /**
     * Adds a reviewer to the journal.
     * @param {Object} reviewerData - The data of the reviewer to be added.
     * @param {string} accessToken - The access token for authentication.
     * @returns {Promise<Object>} - A promise that resolves to the response data.
     */
    async addReviewer(reviewerData, accessToken) {
        try {
            const response = await fetch(BASE_URL + "/reviewer/add-reviewer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(reviewerData),
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Adds bulk reviewers to the journal.
     *
     * @param {Object} reviewerData - The data of the reviewers to be added.
     * @param {string} accessToken - The access token for authentication.
     * @returns {Promise<Object>} - A promise that resolves to the response data.
     */
    async addBulkReviewer(reviewerData, accessToken) {
        try {
            const response = await fetch(BASE_URL + "/reviewer/add-bulk-reviewer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(reviewerData),
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Retrieves the list of reviewers from the server.
     * @param {string} accessToken - The access token for authentication.
     * @returns {Promise<Object>} - A promise that resolves to the response data containing the reviewer list.
     */
    async getReviewerList(accessToken) {
        try {
            const response = await fetch(BASE_URL + "/reviewer/get-reviewer-list", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Deletes a reviewer from the journal.
     * @param {string} reviewerId - The ID of the reviewer to be deleted.
     * @param {string} accessToken - The access token for authentication.
     * @returns {Promise<Object>} - A promise that resolves to the response data.
     */
    async deleteReviewer(reviewerId, accessToken) {
        try {
            const response = await fetch(BASE_URL + `/reviewer/delete-reviewer/${reviewerId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new Reviewer();