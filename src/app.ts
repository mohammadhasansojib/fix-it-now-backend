import express from "express"
import type { Request, Response, NextFunction } from "express"
import { sendResponse } from "./utils/sendResponse.js"
import httpStatus from "http-status"
import cookieParser from "cookie-parser"
import config from "./config/index.js"


const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.cookie_parser_secret));



app.get('/', (req: Request, res: Response) => {
    res.send('Server running...');
});

// 404 handling
app.use((req: Request, res: Response) => {
    sendResponse(res, {
        success: false,
        message: "not found",
        statusCode: 404,
        data: null,
    });
})

// global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = Number(err.statusCode) || httpStatus.INTERNAL_SERVER_ERROR;

    sendResponse(res, {
        success: false,
        message: err.message || "Something went wrong!",
        statusCode,
        data: err.error,
    });
})


export default app;