import notesController from '../controllers/notes.controller'
import authMiddleware from '../middlewares/authMiddleware'
import express from 'express'
const router = express.Router()

router.get('/', authMiddleware, notesController.getNotes) // get all notes of logged in user
router.post('/', authMiddleware, notesController.createNote) // create note

export default router
