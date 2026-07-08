import { Role } from "../../../generated/prisma/enums.js";
import { prisma } from "../../lib/prisma.js";
import { ICreateUserIntoDBPayload } from "./auth.interface.js";


class AuthRepo {

    // create user into DB
    async createUserIntoDB(payload: ICreateUserIntoDBPayload) {
        if (payload.role === "TECHNICIAN") {
            
            const user = await prisma.$transaction(async (tx) => {
                const user = await tx.user.create({
                    data: {
                        ...payload,
                        role: "TECHNICIAN"
                    },
                    omit: {
                        passwordHash: true,
                    }
                });

                await tx.technicianProfile.create({
                    data: {
                        userId: user.id,
                    }
                })

                return user;
            });

            return user;

        } else {
            const user = await prisma.user.create({
                data: {
                    ...payload,
                    role: "CUSTOMER"
                },
                omit: {
                    passwordHash: true,
                }
            })

            return user;
        }
    }

    // get user by email
    async getUserByEmailFromDB(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (user?.role === "TECHNICIAN") {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
                include: {
                    technicianProfile: true,
                },
            });

            return user;
        }

        return user;
    }

}

const authRepo = new AuthRepo();

export default authRepo;