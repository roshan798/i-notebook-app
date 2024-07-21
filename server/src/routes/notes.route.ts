import notesController from "@controllers/notes.controller";
import authMiddleware from "@middlewares/authMiddleware";
import express from "express";
const router = express.Router();

router.get('/notes', authMiddleware, notesController.getNotes)


export default router;