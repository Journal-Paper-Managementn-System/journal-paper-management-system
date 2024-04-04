import { BASE_URL } from "./helper";

class Journal {

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