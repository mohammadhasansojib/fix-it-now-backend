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

    // get user by id
    async getUserByIdFromDB(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id,
                role: {
                    in: [Role.CUSTOMER, Role.TECHNICIAN],
                },
            },
            omit: {
                passwordHash: true,
            }
        });

        return user;
    }

    // update ban/unban status
    async updateUserStatusIntoDB(id: string, isBanned: boolean) {
        const user = await prisma.user.update({
            where: {
                id,
            },
            data: {
                isBanned,
            },
            omit: {
                passwordHash: true,
            }
        });

        return user;
    }

    // get all bookings
    async getAllBookingsFromDB() {
        const bookings = await prisma.booking.findMany();

        return bookings;
    }

    // get all categories
    async getAllCategoriesFromDB() {
        const categories = await prisma.category.findMany();

        return categories;
    }

    // create service category
    async createCategoryIntoDB(name: string) {
        const category = await prisma.category.create({
            data: {
                name,
            }
        });

        return category;
    }

}

const adminRepo = new AdminRepo();
export default adminRepo;