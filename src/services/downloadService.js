import { BASE_URL } from "./helper";

class DownloadService {
    async downloadArticles(files, accessToken) {
        try {
            const response = await fetch(BASE_URL + '/zip/create-zip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(files)
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new DownloadService();