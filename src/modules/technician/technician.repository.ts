import { prisma } from "../../lib/prisma.js"


class TechnicianRepo {
    // get all technicians
    async getAllTechniciansFromDB() {
        const technicians = await prisma.technicianProfile.findMany();

        return technicians;
    }

    // get technician with review
    async getTechnicianwithReviewFromDB(technicianId: string) {
        const [technician, review] = await Promise.all([
            prisma.technicianProfile.findUnique({
                where: {
                    id: technicianId,
                },
            }),
            prisma.review.findMany({
                where: {
                    booking: {
                        technicianId,
                    }
                }
            })
        ])

        const technicianWithReview = {
            ...technician,
            reviews: review,
        }

        return technicianWithReview;
    }

}


const technicianRepo = new TechnicianRepo();
export default technicianRepo;