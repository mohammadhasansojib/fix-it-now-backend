import { prisma } from "../../lib/prisma.js"
import { ICreateSlotPayload, ITechnicianProfileUpdatePayload } from "./technician.interface.js";


class TechnicianRepo {
    // get all technicians
    async getAllTechniciansFromDB() {
        const technicians = await prisma.technicianProfile.findMany();

        return technicians;
    }

    // get technician profile by id
    async getTechnicianProfileByIdFromDB(id: string) {
        const technicianProfile = await prisma.technicianProfile.findUnique({
            where: {
                id,
            },
        });

        return technicianProfile;
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

    // update technician profile
    async updateTechnicianProfileIntoDB(id: string, payload: ITechnicianProfileUpdatePayload) {
        const {bio, profilePhoto, price, skills, experience} = payload;

        const updatedTechnicianProfile = await prisma.technicianProfile.update({
            where: {
                id,
            },
            data: {
                bio,
                profilePhoto,
                price,
                skills,
                experience,
            },
        });
        
        return updatedTechnicianProfile;
    }

    // create availability slot
    async createAvailabilitySlotIntoDB(payload: ICreateSlotPayload) {
        const {dayOfWeek, startTime, endTime, technicianId} = payload;

        const slot = await prisma.availabilitySlot.create({
            data: {
                dayOfWeek,
                startTime,
                endTime,
                technicianId,
            },
        });

        return slot;
    }

    async getAvailabilitySlotsByDayFromDB(dayOfWeek: number, technicianId: string) {
        const slots = await prisma.availabilitySlot.findMany({
            where: {
                dayOfWeek,
                technicianId,
            },
            orderBy: {
                startTime: "asc",
            }
        })

        return slots;
    }

    // get technician's all bookings
    async getTechnicianBookingsFromDB(technicianId: string) {
        const bookings = await prisma.booking.findMany({
            where: {
                technicianId,
            }
        });

        return bookings;
    }
}


const technicianRepo = new TechnicianRepo();
export default technicianRepo;