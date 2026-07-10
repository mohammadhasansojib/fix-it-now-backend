import type { Request, Response } from "express";
import reviewService from "./review.service.js";
import { sendResponse } from "../../utils/sendResponse.js";



const createReview = async (req: Request, res: Response) => {
    const review = await reviewService.createReview(req.body);

    sendResponse(res, {
        success: true,
        message: "review created successfully",
        statusCode: 201,
        data: {
            review,
        },
    });
}


const reviewController = {
    createReview,
}
export default reviewController;