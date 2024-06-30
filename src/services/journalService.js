import { BASE_URL } from "./helper";

class Journal {

    /**
     * Retrieves the list of journals from the server.
     * @returns {Promise<Array>} A promise that resolves to an array of journal data.
     */
    async getJournalList() {
        try {
            const response = await fetch(BASE_URL + "/journal/get-journal-list", {
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
     * Adds a journal to the server.
     * @param {Object} journalData - The data of the journal to be added.
     * @param {string} accessToken - The access token for authentication.
     * @returns {Promise<Object>} - A promise that resolves to the response data from the server.
     */
    async addJournal(journalData, accessToken) {
        try {
            const response = await fetch(BASE_URL + "/journal/add-journal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify(journalData),
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Deletes a journal by its ID.
     * @param {string} journalId - The ID of the journal to delete.
     * @param {string} accessToken - The access token for authentication.
     * @returns {Promise<Object>} - A promise that resolves to the response data.
     */
    async deleteJournal(journalId, accessToken) {
        try {
            const response = await fetch(BASE_URL + `/journal/delete-journal/${journalId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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
     * Adds an editor to the journal.
     * @param {Object} editorData - The data of the editor to be added.
     * @param {string} accessToken - The access token for authentication.
     * @returns {Promise<Object>} - A promise that resolves to the response data.
     */
    async addEditor(editorData, accessToken) {
        try {
            const response = await fetch(BASE_URL + "/editor/add-editor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify(editorData),
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Removes an editor from a journal.
     * @param {string} journalId - The ID of the journal.
     * @param {string} accessToken - The access token for authentication.
     * @returns {Promise<Object>} - A promise that resolves to the response data.
     */
    async removeEditor(journalId, accessToken) {
        try {
            const response = await fetch(BASE_URL + `/editor/remove-editor/${journalId}`, {
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
}

export default new Journal();