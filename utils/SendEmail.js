import { createTransport } from "nodemailer";
import pug from "pug";
import { htmlToText } from "html-to-text";
import path from "path";
import { fileURLToPath } from "url";

//to define the __dirname vriable
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Email {
    constructor(user, OTP) {
        this.to = user.email;
        this.firstName = user.firstName;
        this.OTP = OTP;
    }

    transporter() {
        return createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    async SendEmail() {
        const html = pug.renderFile(`${__dirname}/../emailTemp.pug`, {
            OTP: this.OTP,
            firstName: this.firstName,
        });

        const mailOption = {
            from: process.env.EMAIL,
            to: this.to,
            subject: "rest your password <vaild for 10 min>",
            html,
            text: htmlToText(html),
        };

        await this.transporter().sendMail(mailOption);
    }
}

export default Email;
