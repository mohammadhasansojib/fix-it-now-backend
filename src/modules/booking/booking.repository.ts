import { prisma } from "../../lib/prisma.js";
import { ICreateBookingPayload } from "./booking.interface.js";


class BookingRepo {
    // create booking
    async createBooking(payload: Required<ICreateBookingPayload>) {
        const booking = await prisma.booking.create({
            data: {
                ...payload,
            }
        });

        return booking;
    }

}


const bookingRepo = new BookingRepo();
export default bookingRepo;