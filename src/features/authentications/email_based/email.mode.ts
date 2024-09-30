interface LoginInput {
    input: {
        email: string
        password: string
    }
}


interface ResetPasswordInput {
    input: {
        email: string
        code: string
    }
}

interface NewPasswordInput {
    input: {
        email: string
        newPassword: string
        resetToken: string
    }
}


interface Response {
    success: boolean;
    message: string;
    resetToken?: string,
    token?: string;
}

interface SignupInput {
    input: {
        username: string;
        phoneNumber: string;
        email: string;
        password: string;
    };
}


interface AuthPayload {
    success: boolean
    token: string
}