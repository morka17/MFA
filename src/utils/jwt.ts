import { sign, verify } from "jsonwebtoken";
import { GraphQLError } from "graphql";
import config from "./config/env.config";


const { jwt } = config

export function jwtEncode(args: Object, expiresIn?: string | number): string {
    const token = sign(args, jwt.secret!, { expiresIn: jwt.expiresIn || '3h' })



    return token
}


interface JwtPayload {
    iat: number; // Issued at time (in seconds)
    exp: number; // Expiry time (in seconds)
}



export function jwtDecode<T>(token: string) {
    try {
        const decoded = verify(token, jwt.secret)
        return decoded as T
    } catch (err) {
        return null
    }
}


export function jwtVerify<T>(token: string): T {
    try {
        const decoded = verify(token, jwt.secret!)
        return decoded as T
    } catch (err) {
        throw new GraphQLError("Invalid Session Token", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 }
            }
        })
    }
}



export const isTokenExpired = (jwtPayload: JwtPayload): boolean => {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return currentTime >= jwtPayload.exp;
};