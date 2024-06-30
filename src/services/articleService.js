import { BASE_URL } from "./helper";

class Article {

    /**
     * Retrieves an article from the server.
     * @param {string} accessToken - The access token for authentication.
     * @returns {Promise<Object>} - A promise that resolves to the article data.
     */
    async getArticle(accessToken) {
        try {
            const response = await fetch(BASE_URL + "/article/get-article", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                }
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Adds an article to the server.
     * @param {Object} article - The article object to be added.
     * @param {string} accessToken - The access token for authentication.
     * @returns {Promise<Object>} - A promise that resolves to the response data from the server.
     */
    async addArticle(article, accessToken) {
        try {
            const response = await fetch(BASE_URL + "/article/add-article", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: article,
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Updates an article.
     * @param {Object} articleData - The data of the article to be updated.
     * @param {string} accessToken - The access token for authorization.
     * @returns {Promise<Object>} - A promise that resolves to the response data.
     */
    async updateArticle(articleData, accessToken) {
        try {
            const response = await fetch(BASE_URL + "/article/update-article", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(articleData),
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Retrieves the list of articles for a given journal ID.
     * @param {string} journalId - The ID of the journal.
     * @returns {Promise<Array>} - A promise that resolves to an array of articles.
     */
    async getArticleList(journalId) {
        try {
            const response = await fetch(`${BASE_URL}/article/get-article-list/${journalId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }


    /**
     * Retrieves review articles from the server.
     * @param {string} accessToken - The access token for authentication.
     * @returns {Promise<Object>} - A promise that resolves to the response data.
     */
    async getReviewArticles(accessToken) {
        try {
            const response = await fetch(BASE_URL + "/article/get-review-articles", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Updates the review of an article.
     * @param {Object} reviewData - The data for the review.
     * @param {string} accessToken - The access token for authentication.
     * @returns {Promise<Object>} - A promise that resolves to the response data.
     */
    async updateReview(reviewData, accessToken) {
        try {
            const response = await fetch(BASE_URL + "/article/update-review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify(reviewData),
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new Article();