import { AppError, BadRequestError, ForbiddenError, NotFoundError } from "../../utils/errorHandler.js";
import { ICreateSlotPayload, ITechnicianProfileUpdatePayload } from "./technician.interface.js";
import technicianRepo from "./technician.repository.js";
import { isAfter, areIntervalsOverlapping } from "date-fns";


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

const createAvailabilitySlot = async (payload: ICreateSlotPayload) => {
    const {dayOfWeek, startTime, endTime, technicianId} = payload;

    const newStartTime = new Date(startTime);
    const newEndTime = new Date(endTime);

    if (dayOfWeek < 0 || dayOfWeek > 6) {
        throw new BadRequestError("invalid day of week, must be between 0-6");
    }
    if (isAfter(newStartTime, newEndTime)) {
        throw new BadRequestError("start time cannot be after end time");
    }

    const existingSlotsOfDay = await technicianRepo.getAvailabilitySlotsByDayFromDB(dayOfWeek, technicianId);
    logger.info("slots", existingSlotsOfDay);

    for (const slot of existingSlotsOfDay) {
        const newInterval = {
            start: newStartTime,
            end: newEndTime,
        }

        const [existingStartHours, existingStartMinutes] = slot.startTime.split(":").map(Number);
        const [existingEndHours, existingEndMinutes] = slot.endTime.split(":").map(Number);

        const existingStartTime = new Date(newStartTime);
        const existingEndTime = new Date(newEndTime);

        existingStartTime.setHours(existingStartHours, existingStartMinutes);
        existingEndTime.setHours(existingEndHours, existingEndMinutes);


        const existingInterval = {
            start: existingStartTime,
            end: existingEndTime,
        }

        if (areIntervalsOverlapping(newInterval, existingInterval)) {
            throw new BadRequestError("time range overlapping with an existing slot");
        }
    }

    const slot = await technicianRepo.createAvailabilitySlotIntoDB({
        dayOfWeek,
        startTime: newStartTime.toISOString().substring(11, 16),
        endTime: newEndTime.toISOString().substring(11, 16),
        technicianId,
    });
    if (!slot) {
        throw new AppError("availability slot cannot be created");
    }

    return slot;
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
    createAvailabilitySlot,
    getTechnicianWithReviews,
}
export default technicianService;