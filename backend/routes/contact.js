import express from "express";
import { contactRouter } from "../controllers/contact.controller.js";


const router = express.Router();


router.post("/", contactRouter)

export default router;