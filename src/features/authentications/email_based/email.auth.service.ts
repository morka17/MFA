import { PrismaClient } from "@prisma/client";
import { Mailer, SendVerificationEmailProps } from "../../mailer/mailer.model";

class EmailBasedAuthService {


    // Signup or create account 
    async createUser({ email, password, phoneNumber, displayName, prisma }: { email: string, password: string, phoneNumber: string, displayName: string, prisma: PrismaClient }) {


    }

    // find user by email
    async findUserByEmail(email: string, prisma: PrismaClient) { }

    // sign in 

    // forgot password 

    // new password 

    // change passwod 

    // send email verification otp 
    async sendEmailVerficationCode(mailer: Mailer, props: SendVerificationEmailProps, prisma: PrismaClient) { }

    // verify email otp 

    // verify password reset token 
    async verifyPassResetCode(email: string, prisma: PrismaClient) {


    }


}
const emailAuthService = new EmailBasedAuthService()
export default emailAuthService;