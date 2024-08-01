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
const notes_1 = __importDefault(require("../schema/models/notes"));
const checkOwnership = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.id;
    const user = req.user;
    const userId = user._id;
    if (!noteId) {
        return res.status(400).json({
            success: false,
            message: 'Note ID is required',
        });
    }
    try {
        const note = yield notes_1.default.findById(noteId);
        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found',
            });
        }
        if (note.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to perform this action',
            });
        }
        next();
    }
    catch (error) {
        console.error('Error checking ownership', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});
exports.default = checkOwnership;
