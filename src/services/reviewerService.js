import { BASE_URL } from "./helper";

class Reviewer {
    async addReviewer(reviewerData, accessToken) {
        try {
            const response = await fetch(BASE_URL + "/journal/add-reviewer", {
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

    async addBulkReviewer(reviewerData, accessToken) {
        try {
            const response = await fetch(BASE_URL + "/journal/add-bulk-reviewer", {
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

    async getReviewerList(accessToken) {
        try {
            const response = await fetch(BASE_URL + "/journal/get-reviewer-list", {
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