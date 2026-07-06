import dotenv from "dotenv";

dotenv.config()

export const config = {
    database_url: process.env.DATABASE_URL,
}

export default config;