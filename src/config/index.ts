import dotenv from "dotenv";

dotenv.config()

export const config = {
    database_url: process.env.DATABASE_URL,
    port: Number(process.env.PORT),
    cookie_parser_secret: process.env.COOKIE_PARSER_SECRET,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_in: Number(process.env.JWT_EXPIRES_IN),
    access_token_cookie_max_age: Number(process.env.ACCESS_TOKEN_COOKIE_MAX_AGE),
}

export default config;