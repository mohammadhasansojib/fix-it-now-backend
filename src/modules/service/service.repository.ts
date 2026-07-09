import { prisma } from "../../lib/prisma.js";


class ServiceRepo {
    // get all services from DB
    async getAllServicesFromDB() {
        const services = await prisma.service.findMany({
            where: {
                
            }
        });

        return services;
    }
}


const serviceRepo = new ServiceRepo();
export default serviceRepo;