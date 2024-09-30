

import { gql } from "apollo-server-express"

const AuthTypeDefs = gql`
  type Query {
    currentUser: User 
  }

  type Mutation {
    signup(input: SignupInput!): Response!
    login(input: LoginInput!): AuthPayload!
    loginOut: Response!
    sendEmailVerificationToken(email: String!): Response!
    sendPasswordResetToken(email: String!): Response!
    verifyResetPasswordToken(input: ResetPasswordInput): ResetResponse!
    setNewPassword(input: NewPasswordInput): Response!
  }


  input ResetPasswordInput {
    email: String!
    code: String!
  }

  input NewPasswordInput {
    email: String!
    newPassword: String!
    resetToken: String!
  }


  input LoginInput {
    email: String!
    password: String!
  }

  type User {
     username: String!
     email: String!
     password: String!

  }

  type Response {
    success: Boolean!
    message:  String!
  }

  type ResetResponse {
    success: Boolean!
    message: String!
    restToken: String!
  }

  input SignupInput {
    username: String!
    phoneNumber: String!
    email: String!
    password: String!
  }


  type AuthPayload {
    success: Boolean!
    token: String!
  }
`;

export default AuthTypeDefs;