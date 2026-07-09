import { prisma } from "../../lib/prisma.js"


class TechnicianRepo {
    // get all technicians
    async getAllTechniciansFromDB() {
        const technicians = await prisma.technicianProfile.findMany();

        return technicians;
    }

}


const technicianRepo = new TechnicianRepo();
export default technicianRepo;