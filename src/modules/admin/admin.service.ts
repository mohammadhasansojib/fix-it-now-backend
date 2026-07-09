import { AppError, BadRequestError, NotFoundError } from "../../utils/errorHandler.js";
import adminRepo from "./admin.repository.js";


const updateUserStatus = async (id: string, isBanned: boolean) => {
    const user = await adminRepo.getUserByIdFromDB(id);
    if (!user) {
        throw new NotFoundError("user not found");
    }
    if (user.isBanned === isBanned) {
        throw new BadRequestError("user has already same status");
    }

    const updatedUser = await adminRepo.updateUserStatusIntoDB(id, isBanned);
    if (!updatedUser) {
        throw new AppError("user cannot be updated");
    }

    return updatedUser;
}




const adminService = {
    updateUserStatus,
}
export default adminService;