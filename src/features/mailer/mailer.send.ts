import sgMail from '@sendgrid/mail';
import nodemailer from "nodemailer"
import fs from "fs/promises"
import path from 'path';
import { Mailer, SendVerificationEmailProps } from './mailer.model';
import config from '../../utils/config/env.config';



const { mailer, app } = config



export class SendgridMailer implements Mailer {
    constructor() {
        sgMail.setApiKey(mailer.APIKEY || '');
    }
    async sendEmailVerificationCode({ to, subject, verificationLink }: SendVerificationEmailProps): Promise<void> {
        // Load the HTML template from the file
        const templatePath = path.join(__dirname, 'email.confirmation.html');
        let htmlContent = await fs.readFile(templatePath, 'utf-8');

        // Replace placeholders with actual values
        htmlContent = htmlContent.replace('{{action_url}}', verificationLink);

        const msg = {
            to,
            from: mailer.email || "noReply@gmail.com", // Replace with your verified sender email
            subject,
            html: htmlContent,
        };

        try {
            await sgMail.send(msg);
            console.log('Verification email sent successfully');
        } catch (error: any) {
            console.error('Error sending verification email:', error);
            throw error
        }
    }

    sendResetPasswordEmail({ to, subject, code, verificationLink }: SendVerificationEmailProps): Promise<void> {
        throw new Error('Method not implemented.');
    }
}


export class NodeMailer implements Mailer {
    private readonly transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: mailer.username,
            pass: mailer.password
        }
    })



    async sendEmailVerificationCode({ to, subject, verificationLink }: SendVerificationEmailProps): Promise<void> {
        // Load the HTML template from the file
        const templatePath = path.join(__dirname, "html", 'email.confirmation.html');
        let htmlContent = await fs.readFile(templatePath, 'utf-8');

        // Replace placeholders with actual values
        const actionUrl = `${app.domain}/auth/verify-email/?token=${verificationLink}`
        htmlContent = htmlContent.replace(/{{action_url}}/g, actionUrl);

        const msg = {
            to,
            from: `${app.name} noReply@gmail.com`, // Replace with your verified sender email
            subject,
            html: htmlContent,
        };

        try {
            const _ = await this.transporter.sendMail(msg);
            // console.log('Verification email sent successfully', _info);
        } catch (error: any) {
            // console.error('Error sending verification email:', error);
            throw error
        }
    }

    async sendResetPasswordEmail({ to, subject, code, verificationLink }: SendVerificationEmailProps): Promise<void> {

        // Load the HTML template from the file
        const templatePath = path.join(__dirname, "html", 'reset.password.html');
        let htmlContent = await fs.readFile(templatePath, 'utf-8');

        // Replace placeholders with actual values

        htmlContent = htmlContent.replace(/{{code}}/g, code || "");

        const msg = {
            to,
            from: "OgaSub noReply@gmail.com", // Replace with your verified sender email
            subject,
            html: htmlContent,
        };

        try {
            await this.transporter.sendMail(msg);
            console.log('Verification email sent successfully');
        } catch (error: any) {
            console.error('Error sending verification email:', error);
            throw error
        }
    };
}
