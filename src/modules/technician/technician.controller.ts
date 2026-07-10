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


const technicianController = {
    getAllTechnicians,
    getSingleTechnician,

    updateProfile,
}
export default technicianController;