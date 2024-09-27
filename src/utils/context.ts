import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

export interface User {
    id: string;
    displayName: string;
    email: string;
    phoneNumber: string;
}

export interface MyContext {
    req: Request,
    res: Response,
    user?: User | null,
    prisma: PrismaClient
}