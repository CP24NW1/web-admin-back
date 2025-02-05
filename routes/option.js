import express from "express";
import { createOptions } from "../controllers/option.js";

const router = express.Router();

//OPTION
router.post("/create", createOptions);

export default router;
