import type { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse.js";
import httpStatus from "http-status"
import authService from "./auth.service.js";

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



const authController = {
    register,
}
export default authController;