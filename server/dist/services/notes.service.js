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
const notes_model_1 = __importDefault(require("../models/notes.model"));
class NotesService {
    create(notes) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const savedNote = new notes_model_1.default(notes);
                yield savedNote.save();
                return savedNote;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getNotesByUserId(userId, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { orderBy = "desc", sortBy = "createdAt", limit, page } = params;
            const sortOrder = orderBy === "desc" ? -1 : 1;
            const sortCriteria = {
                updatedAt: sortOrder,
                // createdAt: sortOrder
            };
            try {
                const notes = yield notes_model_1.default.find({ userId })
                    .sort(sortCriteria);
                return notes;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getNoteById(noteId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const note = yield notes_model_1.default.findById(noteId);
                return note;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteNoteById(noteId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const note = yield notes_model_1.default.findByIdAndDelete(noteId);
                return note;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateNoteById(noteId, notes) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedNote = yield notes_model_1.default.findByIdAndUpdate(noteId, notes, { new: true });
                return updatedNote;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new NotesService();
