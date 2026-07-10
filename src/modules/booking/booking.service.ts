import { NotFoundError } from "../../utils/errorHandler.js";
import { logger } from "../../utils/logger.js";
import { ICreateBookingPayload } from "./booking.interface.js";
import bookingRepo from "./booking.repository.js";
import {addMinutes} from "date-fns"


const createBooking = async (payload: ICreateBookingPayload) => {
    const {startTime, serviceId, customerId} = payload;
    const startTimeinDate = new Date(startTime);

    const service = await bookingRepo.getServiceByIdFromDB(serviceId);
    if (!service) {
        throw new NotFoundError("service not found");
    }

    const bookingData = {
        startTime,
        endTime: addMinutes(startTimeinDate, service.durationMinutes),
        serviceId,
        customerId,
        technicianId: service.technicianId,
        amount: service.price,
    }

    const booking = await bookingRepo.createBooking(bookingData);
    if (!booking) {
        throw new NotFoundError("booking cannot be created");
    }

    logger.info("booking created", booking);

    return booking;
}


const bookingService = {
    createBooking,

}
export default bookingService;