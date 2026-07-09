import { Role } from "../../../generated/prisma/enums.js";
import { prisma } from "../../lib/prisma.js";



class AdminRepo {

    // get all users
    async getAllUsersFromDB() {
        const users = await prisma.user.findMany({
            where: {
                role: {
                    in: [Role.CUSTOMER, Role.TECHNICIAN],
                },
            },
            omit: {
                passwordHash: true,
            }
        });

        return users;
    }

}

const adminRepo = new AdminRepo();
export default adminRepo;