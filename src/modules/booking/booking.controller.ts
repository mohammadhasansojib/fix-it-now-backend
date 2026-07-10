import type {Request, Response} from "express"
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


const bookingController = {
    createBooking,
}
export default bookingController;