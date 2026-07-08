import jwt from "jsonwebtoken"
import config from "../config/index.js"
import { Role } from "../../generated/prisma/enums.js"

export const getAccessToken = (
    id: string,
    email: string,
    role: Role,
    isBanned: boolean,
) => {
    return jwt.sign(
        {
            id,
            email,
            role,
            isBanned,
        },
        config.jwt_secret as string,
        {
            expiresIn: config.jwt_expires_in,
        }
    )
}

export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret);
}

// export const getRefreshToken = (
//     userId: number,
//     sessionId: string,
//     email: string,
// ) => {
//     return jwt.sign(
//         {
//             userId,
//             sessionId,
//             email,
//         },
//         env.JWT_SECRET as string,
//         {
//             expiresIn: Number(env.REFRESH_TOKEN_TIME),
//         }
//     )
// }