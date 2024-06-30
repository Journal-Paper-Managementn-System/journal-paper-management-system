import { BASE_URL } from "./helper";

class ZipService {
    /**
     * Creates a zip file containing the specified files.
     * @param {Array} files - The files to include in the zip.
     * @param {string} accessToken - The access token for authentication.
     * @returns {Promise<Object>} - A promise that resolves to the response data from the server.
     */
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

    /**
     * Downloads a zip file from the server.
     * @param {string} filename - The name of the zip file to download.
     * @param {string} accessToken - The access token for authentication.
     * @returns {Promise<Blob>} - A promise that resolves to the downloaded zip file as a Blob object.
     */
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