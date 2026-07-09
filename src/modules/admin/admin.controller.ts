import type { Request, Response } from "express";
import adminRepo from "./admin.repository.js";
import { AppError, NotFoundError } from "../../utils/errorHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import httpStatus from "http-status"
import adminService from "./admin.service.js";

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

const updateUserStatus = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {isBanned} = req.body;

    const updatedUser = await adminService.updateUserStatus(id as string, isBanned);

    sendResponse(res, {
        success: true,
        message: "user status updated successfully",
        statusCode: httpStatus.OK,
        data: {
            user: updatedUser,
        }
    });
}

const getAllBookings = async (req: Request, res: Response) => {
    const bookings = await adminRepo.getAllBookingsFromDB();
    if (bookings.length === 0) {
        throw new NotFoundError("no bookings found");
    }

    sendResponse(res, {
        success: true,
        message: "retrived all bookings successfully",
        statusCode: httpStatus.OK,
        data: {
            bookings,
        }
    })
}

const getAllCategories = async (req: Request, res: Response) => {
    const categories = await adminRepo.getAllCategoriesFromDB();
    if (categories.length === 0) {
        throw new NotFoundError("no categories found");
    }

    sendResponse(res, {
        success: true,
        message: "retrived all categories successfully",
        statusCode: httpStatus.OK,
        data: {
            categories,
        }
    })
}


const adminController = {
    getAllUsers,
    updateUserStatus,
    getAllBookings,
    getAllCategories,
}
export default adminController;