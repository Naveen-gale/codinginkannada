import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contact.js";
import dotenv from "dotenv";
dotenv.config();



const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());



app.use("/api/contact", contactRoutes);


export default app;