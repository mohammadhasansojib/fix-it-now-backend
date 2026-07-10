import { AppError } from "../../utils/errorHandler.js";
import { ICreateServicePayload } from "./service.interface.js";
import serviceRepo from "./service.repository.js";


const createService = async (payload: ICreateServicePayload) => {
    const {title, description, price, durationMinutes, technicianId, categoryId} = payload;

    const service = await serviceRepo.createServiceIntoDB({
        title,
        description,
        price,
        durationMinutes,
        technicianId,
        categoryId,
    });
    if (!service) {
        throw new AppError("service cannot be created");
    }

    return service;
}


const serviceService = {
    createService,
}
export default serviceService;