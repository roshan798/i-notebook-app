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
const config_1 = __importDefault(require("../configs/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const refresh_model_1 = __importDefault(require("../schema/models/refresh.model"));
class TokenService {
    constructor() {
        this.generateAccessToken = (payload) => {
            return jsonwebtoken_1.default.sign(payload, config_1.default.jwt.access_secret, { expiresIn: '1d' });
        };
        this.generateRefreshToken = (payload) => {
            return jsonwebtoken_1.default.sign(payload, config_1.default.jwt.refresh_secret, {
                expiresIn: '30d',
            });
        };
    }
    generateTokens(payload) {
        const accessToken = this.generateAccessToken(payload);
        const refreshToken = this.generateRefreshToken(payload);
        return { accessToken, refreshToken };
    }
    storeRefreshToken(token, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield refresh_model_1.default.create({
                    token: token,
                    userId: userId,
                });
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    verifyAccessToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.verify(token, config_1.default.jwt.access_secret);
        });
    }
    verifyRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.verify(refreshToken, config_1.default.jwt.refresh_secret);
        });
    }
    findRefreshToken(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield refresh_model_1.default.findOne({
                userId: userId,
            });
        });
    }
    updateRefreshToken(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield refresh_model_1.default.updateOne({ _id: userId }, { token: refreshToken });
        });
    }
    removeToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield refresh_model_1.default.deleteOne({ token: refreshToken });
        });
    }
}
exports.default = new TokenService();
