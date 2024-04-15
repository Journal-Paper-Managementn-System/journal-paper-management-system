import { BASE_URL } from "./helper";

class ZipService {
    async createZip(files, accessToken) {
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

    async downloadZip(filename, accessToken) {
        try {
            const response = await fetch(BASE_URL + `/zip/download-zip/${filename}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const responseData = await response.blob();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new ZipService();