import type { Request, Response } from "express";
import technicianService from "./technician.service.js";
import { AppError, NotFoundError } from "../../utils/errorHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import httpStatus from "http-status"
import technicianRepo from "./technician.repository.js";

const getAllTechnicians = async (req: Request, res: Response) => {
    const technicians = await technicianRepo.getAllTechniciansFromDB();
    if (technicians.length === 0) {
        throw new NotFoundError("no techincians found");
    }

    sendResponse(res, {
        success: true,
        message: "retrived all technicians successfully",
        statusCode: httpStatus.OK,
        data: {
            technicians,
        },
    })
}

const getSingleTechnician = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const technician = await technicianService.getTechnicianWithReviews(id);

    sendResponse(res, {
        success: true,
        message: "retrived technician successfully",
        statusCode: httpStatus.OK,
        data: {
            technician,
        },
    })
}

const updateProfile = async (req: Request, res: Response) => {

    const id = req.technicianProfile?.id as string;

    const updatedTechnicianProfile = await technicianService.updateTechnicianProfile(id, req.body);
    if (!updatedTechnicianProfile) {
        throw new AppError("technician profile cannot be updated");
    }

    sendResponse(res, {
        success: true,
        message: "technician profile updated successfully",
        statusCode: httpStatus.OK,
        data: {
            technicianProfile: updatedTechnicianProfile,
        }
    })

}

const createAvailabilitySlot = async (req: Request, res: Response) => {
    const id = req.technicianProfile?.id as string;

    const slot = await technicianService.createAvailabilitySlot({
        ...req.body,
        technicianId: id,
    });

    sendResponse(res, {
        success: true,
        message: "availability slot created successfully",
        statusCode: httpStatus.CREATED,
        data: {
            availabilitySlot: slot,
        }
    })

}

const getTechnicianBookings = async (req: Request, res: Response) => {
    const technicianId = req.technicianProfile?.id as string;

    const bookings = await technicianRepo.getTechnicianBookingsFromDB(technicianId);
    if (bookings.length === 0) {
        throw new NotFoundError("no bookings found");
    }

    sendResponse(res, {
        success: true,
        message: "retrived all bookings successfully",
        statusCode: httpStatus.OK,
        data: {
            bookings,
        },
    });
}

const updateBookingStatus = async (req: Request, res: Response) => {
    const bookingId = req.params.id as string;
    const technicianId = req.technicianProfile?.id as string;
    const {status} = req.body;

    const updatedBooking = await technicianService.updateBookingStatus(bookingId, status, technicianId);

    sendResponse(res, {
        success: true,
        message: "booking status updated successfully",
        statusCode: httpStatus.OK,
        data: {
            booking: updatedBooking,
        },
    });
}


const technicianController = {
    getAllTechnicians,
    getSingleTechnician,

    updateProfile,
    createAvailabilitySlot,
    getTechnicianBookings,
    updateBookingStatus,
}
export default technicianController;