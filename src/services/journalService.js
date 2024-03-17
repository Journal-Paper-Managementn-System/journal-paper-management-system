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

    async addJournal(journalData) {
        try {
            const response = await fetch(BASE_URL + "/journal/add-journal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(journalData),
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new Journal();