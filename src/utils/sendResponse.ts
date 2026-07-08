import type {Response} from "express"

export const sendResponse = (
    res: Response,
    response: {
        message: string,
        statusCode: number,
        success: boolean,
        data: any,
    }
) => {
    res.status(response.statusCode).json(response);
}