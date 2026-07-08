import { Role } from "../../../generated/prisma/enums.js"

export interface ICreateUserPayload {
    username: string,
    email: string,
    password: string,
    role: Omit<Role, "ADMIN">
}

export interface ICreateUserIntoDBPayload {
    username: string,
    email: string,
    passwordHash: string,
    role: Omit<Role, "ADMIN">
}
