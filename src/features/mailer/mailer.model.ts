export interface SendVerificationEmailProps {
    to: string;
    subject: string;
    content?: string;
    code?: string;
    verificationLink: string;
}

export interface Mailer {
    sendEmailVerificationCode({ to, subject, verificationLink }: SendVerificationEmailProps): Promise<void>;
    sendResetPasswordEmail({ to, subject, code, verificationLink }: SendVerificationEmailProps): Promise<void>;
}
