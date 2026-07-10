import type { Request, Response } from "express";
import serviceRepo from "./service.repository.js";
import { NotFoundError } from "../../utils/errorHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import serviceService from "./service.service.js";


const getAllServices = async (req: Request, res: Response) => {
    const services = await serviceRepo.getAllServicesFromDB();
    if (services.length === 0) {
        throw new NotFoundError("no services found");
    }

    sendResponse(res, {
        success: true,
        message: "retrived all services successfully",
        statusCode: 200,
        data: {
            services,
        }
    });
}

const createService = async (req: Request, res: Response) => {
    const id = req.technicianProfile?.id as string;
    
    const service = await serviceService.createService({
        ...req.body,
        technicianId: id,
    });

    sendResponse(res, {
        success: true,
        message: "service created successfully",
        statusCode: 201,
        data: {
            service,
        },
    })
    
}


const serviceController = {
    getAllServices,
    createService,
}
export default serviceController;