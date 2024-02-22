class Journal {

    constructor() {
        this.journals = [];
    }

    async getJournal() {
        try {
            let response = await fetch("http://localhost:3000/api/get-journal");
            let data = await response.json();
            this.journals = data;
            return this.journals;
        } catch (error) {
            console.log(error);
        }
    }
    
    async addJournal(journalData) {
        try {
            let response = await fetch("http://localhost:3000/api/add-journal", {
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