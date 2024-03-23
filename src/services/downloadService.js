class DownloadService {
    async downloadArticles(files, accessToken) {
        try {
            const response = await fetch('http://localhost:5000/zip/create-zip', {
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