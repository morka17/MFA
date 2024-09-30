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
exports.NodeMailer = exports.SendgridMailer = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const env_config_1 = __importDefault(require("../../utils/config/env.config"));
const { mailer, app } = env_config_1.default;
class SendgridMailer {
    constructor() {
        mail_1.default.setApiKey(mailer.APIKEY || '');
    }
    sendEmailVerificationCode({ to, subject, verificationLink }) {
        return __awaiter(this, void 0, void 0, function* () {
            // Load the HTML template from the file
            const templatePath = path_1.default.join(__dirname, 'email.confirmation.html');
            let htmlContent = yield promises_1.default.readFile(templatePath, 'utf-8');
            // Replace placeholders with actual values
            htmlContent = htmlContent.replace('{{action_url}}', verificationLink);
            const msg = {
                to,
                from: mailer.email || "noReply@gmail.com",
                subject,
                html: htmlContent,
            };
            try {
                yield mail_1.default.send(msg);
                console.log('Verification email sent successfully');
            }
            catch (error) {
                console.error('Error sending verification email:', error);
                throw error;
            }
        });
    }
    sendResetPasswordEmail({ to, subject, code, verificationLink }) {
        throw new Error('Method not implemented.');
    }
}
exports.SendgridMailer = SendgridMailer;
class NodeMailer {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: mailer.username,
                pass: mailer.password
            }
        });
    }
    sendEmailVerificationCode({ to, subject, verificationLink }) {
        return __awaiter(this, void 0, void 0, function* () {
            // Load the HTML template from the file
            const templatePath = path_1.default.join(__dirname, "html", 'email.confirmation.html');
            let htmlContent = yield promises_1.default.readFile(templatePath, 'utf-8');
            // Replace placeholders with actual values
            const actionUrl = `${app.domain}/auth/verify-email/?token=${verificationLink}`;
            htmlContent = htmlContent.replace(/{{action_url}}/g, actionUrl);
            const msg = {
                to,
                from: `${app.name} noReply@gmail.com`,
                subject,
                html: htmlContent,
            };
            try {
                const _ = yield this.transporter.sendMail(msg);
                // console.log('Verification email sent successfully', _info);
            }
            catch (error) {
                // console.error('Error sending verification email:', error);
                throw error;
            }
        });
    }
    sendResetPasswordEmail({ to, subject, code, verificationLink }) {
        return __awaiter(this, void 0, void 0, function* () {
            // Load the HTML template from the file
            const templatePath = path_1.default.join(__dirname, "html", 'reset.password.html');
            let htmlContent = yield promises_1.default.readFile(templatePath, 'utf-8');
            // Replace placeholders with actual values
            htmlContent = htmlContent.replace(/{{code}}/g, code || "");
            const msg = {
                to,
                from: "OgaSub noReply@gmail.com",
                subject,
                html: htmlContent,
            };
            try {
                yield this.transporter.sendMail(msg);
                console.log('Verification email sent successfully');
            }
            catch (error) {
                console.error('Error sending verification email:', error);
                throw error;
            }
        });
    }
    ;
}
exports.NodeMailer = NodeMailer;
