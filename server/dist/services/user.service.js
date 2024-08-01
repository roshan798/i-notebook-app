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
const user_1 = __importDefault(require("../schema/models/user"));
class UserService {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new user_1.default(user);
                yield newUser.save();
                return newUser;
            }
            catch (error) {
                console.error('Error creating user:', error);
                throw new Error('Failed to create user');
            }
        });
    }
    // Get a user by email
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findOne({ email }).exec();
                if (!user) {
                    console.log('User not found');
                    return null;
                }
                return user;
            }
            catch (error) {
                console.error('Error retrieving user:', error);
                throw new Error('Failed to retrieve user');
            }
        });
    }
    getUser(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findOne(filter).exec();
                if (!user) {
                    console.log('User not found');
                    return null;
                }
                return user;
            }
            catch (error) {
                console.error('Error retrieving user:', error);
                throw new Error('Failed to retrieve user');
            }
        });
    }
}
exports.default = new UserService();
