import notesController from '../controllers/notes.controller'
import authMiddleware from '../middlewares/authMiddleware'
import express from 'express'
const router = express.Router()

router.get('/', authMiddleware, notesController.getNotes) 
router.post('/', authMiddleware, notesController.createNote) 
router.put('/:id', authMiddleware, notesController.updateNote) 
router.delete('/:id', authMiddleware, notesController.deleteNote) 


export default router
