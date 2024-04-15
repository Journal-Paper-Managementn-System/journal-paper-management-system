import { BASE_URL } from "./helper";

class Article {

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