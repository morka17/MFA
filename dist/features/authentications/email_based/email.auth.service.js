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
Object.defineProperty(exports, "__esModule", { value: true });
class EmailBasedAuthService {
    // Signup or create account 
    createUser({ email, password, phoneNumber, displayName, prisma }) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    // find user by email
    findUserByEmail(email, prisma) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    // sign in 
    // forgot password 
    // new password 
    // change passwod 
    // send email verification otp 
    sendEmailVerficationCode(mailer, props, prisma) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    // verify email otp 
    // verify password reset token 
    verifyPassResetCode(email, prisma) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
const emailAuthService = new EmailBasedAuthService();
exports.default = emailAuthService;
