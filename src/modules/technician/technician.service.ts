import { AppError, BadRequestError, ForbiddenError, NotFoundError } from "../../utils/errorHandler.js";
import { ICreateSlotPayload, ITechnicianProfileUpdatePayload } from "./technician.interface.js";
import technicianRepo from "./technician.repository.js";

const updateTechnicianProfile = async (id: string, payload: ITechnicianProfileUpdatePayload) => {

    const technicianProfile = await technicianRepo.getTechnicianProfileByIdFromDB(id);
    if (!technicianProfile) {
        throw new NotFoundError("technician profile not found");
    }

    const updatedTechnicianProfile = await technicianRepo.updateTechnicianProfileIntoDB(id, payload);
    if (!updatedTechnicianProfile) {
        throw new AppError("technician profile cannot be updated");
    }

    return updatedTechnicianProfile;

}

const getTechnicianWithReviews = async (technicianId: string) => {
    const technician = await technicianRepo.getTechnicianwithReviewFromDB(technicianId);
    if (!technician) {
        throw new NotFoundError("technician not found");
    }

    return technician;
}


const technicianService = {
    updateTechnicianProfile,
    getTechnicianWithReviews,
}
export default technicianService;