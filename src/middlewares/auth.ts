import type { Request, Response, NextFunction } from "express"
import { Role } from "../../generated/prisma/enums.js"
import { JwtPayload } from "jsonwebtoken";
import { AuthorizationError, ForbiddenError, NotFoundError } from "../utils/errorHandler.js";
import config from "../config/index.js";
import { verifyToken } from "../utils/jwt.js";
import authRepo from "../modules/auth/auth.repository.js";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload,
            technicianProfile?: {
                id: string,
            },
        }
    }
}


export const auth = (...roles: Role[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        
        try {
            const token = req.cookies.accessToken ? 
                        req.cookies.accessToken
                        : req.headers.authorization?.startsWith("Bearer")
                        ? req.headers.authorization?.split(" ")[1]
                        : req.headers.authorization;
            if (!token) {
                throw new AuthorizationError("token not found");
            }

            const decoded = verifyToken(
                token,
                config.jwt_secret as string,
            ) as JwtPayload;
            if (!roles.includes(decoded.role)) {
                throw new ForbiddenError("Forbidden, not allowed to access");
            }

            const fetchedUser = await authRepo.getUserByIdFromDB(decoded.id, decoded.role);
            if (!fetchedUser) {
                throw new NotFoundError("unregistered user");
            }
            if (fetchedUser.isBanned) {
                throw new AuthorizationError("you account has been banned");
            }

            req.user = decoded;
            if (decoded.role === "TECHNICIAN") {
                req.technicianProfile = {
                    id: (fetchedUser as any).technicianProfile.id,
                }
            }

            next();

        } catch (error) {

            next(error);

        }
    }
}
