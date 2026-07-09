import type { Request, Response } from "express";
import categoryRepo from "./category.repository.js";
import { NotFoundError } from "../../utils/errorHandler.js";
import {sendResponse} from "../../utils/sendResponse.js";
import httpStatus from "http-status";



const getAllCategories = async (req: Request, res: Response) => {
    const categories = await categoryRepo.getAllCategoriesFromDB();
    if (categories.length === 0) {
        throw new NotFoundError("no categories found");
    }

    sendResponse(res, {
        success: true,
        message: "retrived all service categories successfully",
        statusCode: httpStatus.OK,
        data: {
            categories,
        }
    })    
}


const categoryController = {
    getAllCategories,
}
export default categoryController;