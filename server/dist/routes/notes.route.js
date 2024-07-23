"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notes_controller_1 = __importDefault(require("../controllers/notes.controller"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', authMiddleware_1.default, notes_controller_1.default.getNotes); // get all notes of logged in user
router.post('/', authMiddleware_1.default, notes_controller_1.default.createNote); // create note
exports.default = router;
