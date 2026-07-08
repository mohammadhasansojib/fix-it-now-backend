import { ICreateUserPayload, IUserLoginPayload } from "./auth.interface.js";
import bcrypt from "bcryptjs"
import { AppError, AuthorizationError, BadRequestError, ConflictError, NotFoundError } from "../../utils/errorHandler.js";
import * as z from "zod";
import httpStatus from "http-status";
import { logger } from "../../utils/logger.js";
import { formatZodError } from "../../utils/formatZodError.js";
import authRepo from "./auth.repository.js";
import { getAccessToken } from "../../utils/jwt.js";

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

const userLogin = async (payload: IUserLoginPayload) => {
    const { email, password } = payload;

    // 1. email validation
    const EmailSchema = z.object({
        email: z.email("Invalid email address")
        .min(1, "email is required")
        .trim()
    });
    const validEmail = EmailSchema.safeParse({
        email,
    });

    // email validation error case
    if (!validEmail.success) {
        logger.error("invalid email address", formatZodError(validEmail.error));
        throw new BadRequestError("invalid email address", httpStatus.BAD_REQUEST, formatZodError(validEmail.error));
    }

    // 2. fetch user by email
    const user = await authRepo.getUserByEmailFromDB(validEmail.data.email);
    // user not found case
    if (user === null || !user) {
        logger.error("user not found for login", {
            email: validEmail.data.email,
        });
        throw new NotFoundError("user not found");
    }

    // 3. password matching
    const isPasswordMatched = await bcrypt.compare(password, user.passwordHash);
    // password mismatch case
    if (!isPasswordMatched) {
        logger.error("password mismatched for login", {
            email: validEmail.data.email,
        });
        throw new AuthorizationError("invalid password");
    }

    // 4. access token generation
    const accessToken = getAccessToken(
        user.id,
        user.email,
        user.role,
        user.isBanned,
    );
    
    return {
        accessToken,
    };
}

const authService = {
    createUser,
    userLogin,
}
export default authService;