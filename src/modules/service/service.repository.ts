import { prisma } from "../../lib/prisma.js";
import { ICreateServicePayload } from "./service.interface.js";


class ServiceRepo {
    // get all services from DB
    async getAllServicesFromDB() {
        const services = await prisma.service.findMany({
            where: {
                
            }
        });

        return services;
    }

    // create service
    async createServiceIntoDB(payload: ICreateServicePayload) {
        const {title, description, price, durationMinutes, technicianId, categoryId} = payload;

        const service = await prisma.service.create({
            data: {
                title,
                description,
                price,
                durationMinutes,
                technicianId,
                categoryId,
            }
        });

        return service;
    }
}


const serviceRepo = new ServiceRepo();
export default serviceRepo;