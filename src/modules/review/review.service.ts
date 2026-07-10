import { BookingStatus } from "../../../generated/prisma/enums.js";
import { BadRequestError } from "../../utils/errorHandler.js";
import { logger } from "../../utils/logger.js";
import { IReviewCreatePayload } from "./review.interface.js";
import reviewRepo from "./review.repository.js";


const createReview = async (payload: IReviewCreatePayload) => {
    const {rating, comment, bookingId} = payload;

    if (rating < 1 || rating > 5) {
        throw new BadRequestError("rating must be between 1-5");
    }

    const booking = await reviewRepo.getBookingByIdFromDB(bookingId);
    if (!booking) {
        throw new BadRequestError("booking not found");
    }
    if (booking.status !== BookingStatus.COMPLETED) {
        throw new BadRequestError("incomplete booking cannot be reviewed");
    }

    const review = await reviewRepo.createReviewIntoDB({
        rating,
        comment,
        bookingId,
    });
    if (!review) {
        throw new BadRequestError("review cannot be created");
    }

    logger.info("review created", review);

    return review;
}


const reviewService = {
    createReview,
}
export default reviewService;