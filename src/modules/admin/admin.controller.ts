import type { Request, Response } from "express";
import adminRepo from "./admin.repository.js";
import { AppError, NotFoundError } from "../../utils/errorHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import httpStatus from "http-status"

const getAllUsers = async (req: Request, res: Response) => {
    const users = await adminRepo.getAllUsersFromDB();

    if (users.length === 0) {
        throw new NotFoundError("no users found");
    }

    sendResponse(res, {
        success: true,
        message: "retrived all users",
        statusCode: httpStatus.OK,
        data: {
            users,
        }
    })
}


const adminController = {
    getAllUsers,
}
export default adminController;