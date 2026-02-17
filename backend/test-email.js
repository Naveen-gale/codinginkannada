import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

console.log("Testing Email Sending...");
console.log("User:", process.env.EMAIL_USER);
// console.log("Pass:", process.env.EMAIL_PASS); // Security risk to log password

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function verifyAndSend() {
    try {
        console.log("Verifying transporter...");
        await transporter.verify();
        console.log("Transporter verification successful.");

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "Test Email from CodingInKannada Debugger",
            text: "This is a test email to verify that the Nodemailer configuration is correct.",
        };

        console.log("Sending test email...");
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
        console.log("Response:", info.response);
    } catch (error) {
        console.error("Error during email test:", error);
    }
}

verifyAndSend();
