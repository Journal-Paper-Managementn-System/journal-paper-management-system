import { BASE_URL } from "./helper";

class MailService {
    /**
     * Sends an email using the provided mail data.
     * @param {Object} mailData - The data for the email to be sent.
     * @param {string} mailData.mailFrom - The email address of the sender.
     * @param {string} mailData.mailTo - The email address of the recipient.
     * @param {string} mailData.mailSubject - The subject of the email.
     * @param {string} mailData.mailHtml - The HTML content of the email.
     * @returns {Promise<Object>} - A promise that resolves to the response data from the server.
     */
    async sendMail(mailData) {
        try {
            const response = await fetch(BASE_URL + "/mail-api/send-mail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(mailData),
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new MailService();