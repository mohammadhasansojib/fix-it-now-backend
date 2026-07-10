import { prisma } from "../../lib/prisma.js";
import { IReviewCreatePayload } from "./review.interface.js";


class ReviewRepo {
    // create review
    async createReviewIntoDB(payload: IReviewCreatePayload) {
        const review = await prisma.review.create({
            data: {
                ...payload,
            }
        });

        return review;
    }

    // get booking by id
    async getBookingByIdFromDB(id: string) {
        const booking = await prisma.booking.findUnique({
            where: {
                id,
            },
            include: {
                service: true,
            }
        });

        return booking;
    }
}

const reviewRepo = new ReviewRepo();
export default reviewRepo;