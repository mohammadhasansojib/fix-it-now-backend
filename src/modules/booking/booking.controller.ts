import type {Request, Response} from "express"
import bookingRepo from "./booking.repository.js";
import { NotFoundError } from "../../utils/errorHandler.js";
import {sendResponse} from "../../utils/sendResponse.js"
import httpStatus from "http-status";
import bookingService from "./booking.service.js";

const createBooking = async (req: Request, res: Response) => {

    const id = req.user?.id as string;

    const booking = await bookingService.createBooking({
        ...req.body,
        customerId: id,
    });

    sendResponse(res, {
        success: true,
        message: "booking created successfully",
        statusCode: httpStatus.CREATED,
        data: {
            booking,
        },
    })
}

const getUserBookings = async (req: Request, res: Response) => {
    const id = req.user?.id as string;

    const bookings = await bookingRepo.getUserAllBookingsFromDB(id);
    if (bookings.length === 0) {
        throw new NotFoundError("no booking found");
    }

    sendResponse(res, {
        success: true,
        message: "retrived all bookings successfully",
        statusCode: httpStatus.OK,
        data: {
            bookings,
        },
    })
}


const bookingController = {
    createBooking,
    getUserBookings,
}
export default bookingController;