import type { Request, Response } from "express";
import serviceRepo from "./service.repository.js";
import { NotFoundError } from "../../utils/errorHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";


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


const serviceController = {
    getAllServices,
}
export default serviceController;