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
const AuthenticatonResolvers = {
    Query: {
        currentUser: (_parent, _, context) => {
            const { user } = context;
            return user;
        }
    },
    Mutation: {
        // signup(input: SignupInput!): Response!
        signup: (_parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            let data = Object.assign(Object.assign({}, args.input), { context });
        }),
        // login(input: LoginInput!): AuthPayload!
        login: (_parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        }),
        loginOut: (_parent, _, context) => {
            return {
                success: true,
                message: "success"
            };
        },
        sendEmailVerificationToken: (_parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const data = {
                email: args.email,
                tokenCode: 12939495 // TODO: Generate six digits random  code
            };
        }),
        sendPasswordResetToken: (_parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const data = {
                email: args.email,
                tokenCode: 12939495 // TODO: Generate six digits random  code
            };
        }),
        verifyResetPasswordToken: (_parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, code } = args.input;
        }),
        setNewPassword: (_parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, newPassword, resetToken } = args.input;
        })
    },
};
exports.default = AuthenticatonResolvers;
