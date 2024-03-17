import { BASE_URL } from "./helper";

class MailService {
    async sendMail(mailData) {
        try {
            const response = await fetch(BASE_URL + "/send-mail", {
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