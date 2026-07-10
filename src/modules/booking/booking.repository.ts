import { prisma } from "../../lib/prisma.js";
import { ICreateBookingPayload } from "./booking.interface.js";


class BookingRepo {
    // get all bookings
    async getUserAllBookingsFromDB(customerId: string) {
        const bookings = await prisma.booking.findMany({
            where: {
                customerId,
            },
        });

        return bookings;
    }

    // get booking by id
    async getBookingById(id: string) {
        const booking = await prisma.booking.findUnique({
            where: {
                id,
            },
        });

        return booking;
    }

    // create booking
    async createBooking(payload: Required<ICreateBookingPayload>) {
        const booking = await prisma.booking.create({
            data: {
                ...payload,
            }
        });

        return booking;
    }

    // get service by id
    async getServiceByIdFromDB(id: string) {
        const service = await prisma.service.findUnique({
            where: {
                id,
            },
        });

        return service;
    }
}


const bookingRepo = new BookingRepo();
export default bookingRepo;