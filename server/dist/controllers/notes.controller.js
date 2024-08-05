"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../utils/validation");
const notes_service_1 = __importDefault(require("../services/notes.service"));
const notes_dto_1 = __importDefault(require("../schema/DTO/notes.dto"));
const notes_service_2 = __importDefault(require("../services/notes.service"));
class NotesController {
    createNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const noteData = req.body;
            const notesValidationError = (0, validation_1.validateNote)(noteData);
            if (notesValidationError !== null) {
                return res.status(400).json({
                    success: false,
                    message: notesValidationError,
                });
            }
            if (noteData.pinned === true) {
                noteData.pinnedAt = new Date();
            }
            try {
                const savedNote = yield notes_service_1.default.create(Object.assign(Object.assign({}, noteData), { userId: req.user._id }));
                res.status(201).json({
                    success: true,
                    message: 'Note created successfully',
                    note: new notes_dto_1.default(savedNote),
                });
            }
            catch (error) {
                console.log('Error creating note', error);
                res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        });
    }
    getNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const params = req.query;
            try {
                const notes = yield notes_service_1.default.getNotesByUserId(user._id, params);
                res.json({
                    success: true,
                    notes: notes.map((note) => new notes_dto_1.default(note)),
                });
            }
            catch (error) {
                console.log('Error fetching notes', error);
                res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        });
    }
    getNoteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json({ message: 'GET Note by ID' });
        });
    }
    updateNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const noteId = req.params.id;
            const noteData = req.body;
            const notesValidationError = (0, validation_1.validateNote)(noteData);
            if (notesValidationError !== null) {
                return res.status(400).json({
                    success: false,
                    message: notesValidationError,
                });
            }
            try {
                const updatedNote = yield notes_service_1.default.updateNoteById(noteId, noteData);
                res.json({
                    success: true,
                    message: 'Note updated successfully',
                    note: new notes_dto_1.default(updatedNote),
                });
            }
            catch (error) {
                console.log('Error updating note', error);
                res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        });
    }
    deleteNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const noteId = req.params.id;
            try {
                yield notes_service_1.default.deleteNoteById(noteId);
                res.json({
                    success: true,
                    message: 'Note deleted successfully',
                    // deletedNote: new NotesDTO(note as Notes),
                });
            }
            catch (error) {
                console.log('Error deleting note', error);
                res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        });
    }
    togglePinNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const pin = req.body.pin;
            try {
                yield notes_service_1.default.pinNoteById(id, pin);
                res.json({
                    success: true,
                    message: 'Note pinned successfully',
                    // pinnedNote: new NotesDTO(note as Notes),
                });
            }
            catch (error) {
                console.log('Error pinning note', error);
                res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                });
            }
        });
    }
    updateOneField(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { field } = req.body;
            const { value } = req.body;
            try {
                yield notes_service_1.default.updateFields(id, { [field]: value });
                res.json({
                    success: true,
                    message: 'Note title updated successfully',
                    // updatedNote: new NotesDTO(note as Notes),
                });
            }
            catch (error) {
                console.log('Error updating note title', error);
                res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                });
            }
        });
    }
    changeColor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const notesId = req.params.id;
            const data = req.body;
            try {
                yield notes_service_2.default.updateFields(notesId, data);
                return res.json({
                    success: true
                });
            }
            catch (error) {
                console.log('Error updating note color', error);
                res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                });
            }
        });
    }
}
exports.default = new NotesController();
