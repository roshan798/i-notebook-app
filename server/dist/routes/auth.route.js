"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const router = express_1.default.Router();
router.post('/signup', user_controller_1.default.signup);
router.post('/login', user_controller_1.default.login);
router.post('/logout', user_controller_1.default.logout);
router.get('/refresh', user_controller_1.default.refreshAccessToken);
exports.default = router;
