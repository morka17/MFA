import { GraphQLError } from "graphql/error"
import { MyContext } from "../../../utils/context";
import logger from "../../../utils/logger";




const AuthenticatonResolvers = {

    Query: {
        currentUser: (_parent: any, args: any, context: MyContext) => {
            logger.info({args, message: "Fetching user data"})

            const { user } = context
            return user
        }

    },

    Mutation: {
        // signup(input: SignupInput!): Response!
        signup: async (_parent: any, args: SignupInput, context: MyContext): Promise<any> => {
            logger.info({args, message: "Creating user account"})

            let data = {
                ...args.input,
                context
            }


        },
        // login(input: LoginInput!): AuthPayload!
        login: async (_parent: any, args: LoginInput, context: MyContext): Promise<any> => {

        },
        loginOut: (_parent: any, _: any, context: MyContext): any => {


            return {
                success: true,
                message: "success"
            }
        },
        sendEmailVerificationToken: async (_parent: any, args: any, context: MyContext): Promise<any> => {

            const data = {
                email: args.email,
                tokenCode: 12939495 // TODO: Generate six digits random  code
            }



        },
        sendPasswordResetToken: async (_parent: any, args: any, context: MyContext): Promise<any> => {

            const data = {
                email: args.email,
                tokenCode: 12939495 // TODO: Generate six digits random  code
            }

        },
        verifyResetPasswordToken: async (_parent: any, args: ResetPasswordInput, context: MyContext): Promise<any> => {
            const { email, code } = args.input;

        },
        setNewPassword: async (_parent: any, args: NewPasswordInput, context: MyContext): Promise<any> => {
            const { email, newPassword, resetToken } = args.input;
        }
    },




}



export default AuthenticatonResolvers