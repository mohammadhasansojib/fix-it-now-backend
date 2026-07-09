import { AppError, BadRequestError, NotFoundError } from "../../utils/errorHandler.js";
import technicianRepo from "./technician.repository.js";

const getTechnicianWithReviews = async (technicianId: string) => {
    const technician = await technicianRepo.getTechnicianwithReviewFromDB(technicianId);
    if (!technician) {
        throw new NotFoundError("technician not found");
    }

    return technician;
}


const technicianService = {
    getTechnicianWithReviews,
}
export default technicianService;