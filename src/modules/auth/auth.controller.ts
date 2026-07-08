import type { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse.js";
import httpStatus from "http-status"
import authService from "./auth.service.js";
import { cookieConfig } from "../../utils/getCookieConfig.js";
import { ICookieConfig } from "./auth.interface.js";
import config from "../../config/index.js";
import { logger } from "../../utils/logger.js";

const register = async (req: Request, res: Response) => {
    // collect data from req.body object
    const {username, email, password, role} = req.body;
    const uppercaseRole = role.toUpperCase();

    // create user
    const user = await authService.createUser({
        username,
        email,
        password,
        role: uppercaseRole,
    });

    // successfull response
    sendResponse(res, {
        success: true,
        message: "registration successfully completed",
        statusCode: httpStatus.CREATED,
        data: {
            user,
        }
    });
}

const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    const result = await authService.userLogin({
        email,
        password,
    });

    res.cookie(
        "accessToken",
        result.accessToken,
        cookieConfig(config.access_token_cookie_max_age) as ICookieConfig
    );
    
    logger.info("user logged in", {
        email,
    });

    sendResponse(res, {
        success: true,
        message: "login successfully completed",
        statusCode: httpStatus.OK,
        data: {
            accessToken: result.accessToken,
        }
    })
}


const authController = {
    register,
    login,
}
export default authController;