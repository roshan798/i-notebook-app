import notesController from '../controllers/notes.controller'
import authMiddleware from '../middlewares/authMiddleware'
import checkOwnership from '../middlewares/checkOwnership'
import express from 'express'
const router = express.Router()

router.get('/', authMiddleware, notesController.getNotes)
router.post('/', authMiddleware, notesController.createNote)
router.put('/:id', authMiddleware, checkOwnership, notesController.updateNote)
router.delete('/:id', authMiddleware, checkOwnership, notesController.deleteNote)
router.put('/:id/pin', authMiddleware, checkOwnership, notesController.togglePinNote)

router.put('/:id/one', authMiddleware, checkOwnership, notesController.updateOneField);
router.patch("/:id/color", authMiddleware, notesController.changeColor)
router.put('/:id/checklist', authMiddleware, notesController.updateChecklist)

export default router