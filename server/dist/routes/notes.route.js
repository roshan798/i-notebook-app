"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notes_controller_1 = __importDefault(require("../controllers/notes.controller"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const checkOwnership_1 = __importDefault(require("@middlewares/checkOwnership"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', authMiddleware_1.default, notes_controller_1.default.getNotes);
router.post('/', authMiddleware_1.default, notes_controller_1.default.createNote);
router.put('/:id', authMiddleware_1.default, checkOwnership_1.default, notes_controller_1.default.updateNote);
router.delete('/:id', authMiddleware_1.default, checkOwnership_1.default, notes_controller_1.default.deleteNote);
router.put('/:id/pin', authMiddleware_1.default, checkOwnership_1.default, notes_controller_1.default.togglePinNote);
router.put('/:id/one', authMiddleware_1.default, checkOwnership_1.default, notes_controller_1.default.updateOneField);
exports.default = router;
