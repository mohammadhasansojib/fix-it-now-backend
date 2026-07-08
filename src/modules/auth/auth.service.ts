import { ICreateUserPayload } from "./auth.interface.js";
import bcrypt from "bcryptjs"
import { AppError, AuthorizationError, BadRequestError, ConflictError, NotFoundError } from "../../utils/errorHandler.js";
import * as z from "zod";
import httpStatus from "http-status";
import { logger } from "../../utils/logger.js";
import { formatZodError } from "../../utils/formatZodError.js";
import authRepo from "./auth.repository.js";

const createUser = async (paylod: ICreateUserPayload) => {
    const { username, email, password, role } = paylod;

    // role validation
    if (role !== "CUSTOMER" && role !== "TECHNICIAN") {
        const error = new BadRequestError("Invalid role", httpStatus.BAD_REQUEST);

        logger.error("invalid role", error);
        throw error;
    }

    // user info validation
    const User = z.object({
        username: z.string()
        .min(3, `username must be atleast 3 characters`)
        .max(30, `username cannot exceed 30 characters`)
        .trim(),

        email: z.email("Invalid email address")
        .min(1, "email is required")
        .trim(),

        password: z.string()
        .min(8, "password must be atleast 8 characters")
        .max(50, "password cannot exceed 50 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
      "Password must contain uppercase, lowercase, and number"),
    });
    const validationResult = User.safeParse({
        username,
        email,
        password,
    });

    if (!validationResult.success) {
        logger.error("invalid user data", formatZodError(validationResult.error));

        throw new BadRequestError("invalid data", httpStatus.BAD_REQUEST, formatZodError(validationResult.error));
    }

    const isAlreadyExist = await authRepo.getUserByEmailFromDB(validationResult.data.email);
    if (isAlreadyExist) {
        throw new ConflictError("this email already exists");
    }

    // generate hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // create user into db
    const user = await authRepo.createUserIntoDB({
        username: validationResult.data.username,
        email: validationResult.data.email,
        passwordHash,
        role,
    });

    if (user === undefined) {
        throw new AppError("user cannot be created", httpStatus.INTERNAL_SERVER_ERROR);
    }

    logger.info("user created successfully", user);

    return user;
}


const authService = {
    createUser,
}
export default authService;