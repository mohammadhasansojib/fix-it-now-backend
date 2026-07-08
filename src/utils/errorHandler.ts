


export class AppError extends Error {
    public statusCode: number;
    public error: any;

    constructor(
        message: string = "Something went wrong!",
        statusCode: number = 500,
        error: any = {},
    ) {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
    }
}

export class NotFoundError extends AppError {
    constructor(
        message: string = "Not Found",
        statusCode: number = 404,
        error: any = {},
    ) {
        super(message, statusCode, error);
    }
}

export class ForbiddenError extends AppError {
    constructor(
        message: string = "Forbidden",
        statusCode: number = 403,
        error: any = {},
    ) {
        super(message, statusCode, error);
    }
}

export class AuthorizationError extends AppError {
    constructor(
        message: string = "Unauthorized Access",
        statusCode: number = 401,
        error: any = {},
    ) {
        super(message, statusCode, error);
    }
}

export class BadRequestError extends AppError {
    constructor(
        message: string = "Bad request",
        statusCode: number = 400,
        error: any = {},
    ) {
        super(message, statusCode, error);
    }
}

export class ConflictError extends AppError {
    constructor(
        message: string = "Conclict error",
        statusCode: number = 409,
        error: any = {},
    ) {
        super(message, statusCode, error);
    }
}