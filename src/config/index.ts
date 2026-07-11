import dotenv from "dotenv";

dotenv.config()

export const config = {
    database_url: process.env.DATABASE_URL,
    port: Number(process.env.PORT),
    cookie_parser_secret: process.env.COOKIE_PARSER_SECRET,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_in: Number(process.env.JWT_EXPIRES_IN),
    access_token_cookie_max_age: Number(process.env.ACCESS_TOKEN_COOKIE_MAX_AGE),
    stripe_secret_key: process.env.STRIPE_SECRET_KEY!,
    stripe_webhook_secret: process.env.STRIPE_WEBHOOK_SECRET!,
    payment_return_url: process.env.PAYMENT_RETURN_URL!,
    payment_refresh_url: process.env.PAYMENT_REFRESH_URL!,
    payment_success_url: process.env.PAYMENT_SUCCESS_URL!,
    payment_cancel_url: process.env.PAYMENT_CANCEL_URL!,
}

export default config;