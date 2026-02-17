import Contact from "../models/contact.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";

export const contactRouter = async (req, res) => {
    try {
        const { name, email, number, message } = req.body;
        if (!name || !email || !number || !message) {
            return res.status(400).send("All fields are required");
        }

        // Removed check for user existence by email to allow multiple messages from same user
        // const user = await Contact.findOne({ email });
        // if (user) {
        //     return res.status(400).send("User already exists pleace contact using give phone number" );
        // }

        if (number.length !== 10) {
            return res.status(400).send("Number must be 10 digits");
        }
        if (name.length < 3) {
            return res.status(400).send("Name must be at least 3 characters");
        }
        if (email.length < 3) {
            return res.status(400).send("Email must be at least 3 characters");
        }
        if (number.length > 10) {
            return res.status(400).send("Number must be at most 10 digits");
        }
        if (email.includes("@") === false) {
            return res.status(400).send("Email is not valid");
        }
        if (email.includes(".") === false) {
            return res.status(400).send("Email is not valid");
        }
        if (email.includes(" ") === true) {
            return res.status(400).send("Email is not valid");
        }
        // Allowed spaces in name
        // if(name.includes(" ") === true){
        //     return res.status(400).send("Name is not valid");
        // }
        if (number.includes(" ") === true) {
            return res.status(400).send("Number is not valid");
        }


        const contact = await Contact.create({ name, email, number, message });

        // Email Configuration
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to admin (self)
            subject: `New Contact Form Submission from ${name}`,
            text: `
                Name: ${name}
                Email: ${email}
                Phone: ${number}
                Message: ${message}
            `,
        };

        // Verify transporter connection
        try {
            await transporter.verify();
            console.log("Transporter verification successful");
        } catch (verifyError) {
            console.error("Transporter verification failed:", verifyError);
            // Optionally decide if you want to stop here or continue
        }



        try {
            const info = await transporter.sendMail(mailOptions);
            console.log("Email sent: " + info.response);
        } catch (mailError) {
            console.error("Error sending email:", mailError);
            fs.appendFileSync("backend_error.log", `Email Error: ${mailError.message}\nStack: ${mailError.stack}\n`);
            // We can choose to return a warning or partial success, but for now we'll just log it 
            // so the user knows data is saved but email failed.
        }

        res.status(201).json({ message: "Contact form submitted successfully" });
    } catch (error) {
        console.error("Error submitting contact form:", error);
        fs.writeFileSync("backend_error.log", `Error: ${error.message}\nStack: ${error.stack}\n`);
        res.status(500).json({ message: "Contact form not submitted" });
    }
}