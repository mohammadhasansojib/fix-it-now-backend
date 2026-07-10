import express from "express"
import { auth } from "../../middlewares/auth.js";
import { Role } from "../../../generated/prisma/enums.js";
import technicianController from "./technician.controller.js";

const router = express.Router();

// private routes
router.put(
    '/profile',
    auth(Role.TECHNICIAN),
    technicianController.updateProfile
)
router.post(
    '/availability',
    auth(Role.TECHNICIAN),
    technicianController.createAvailabilitySlot
)
router.get(
    '/bookings',
    auth(Role.TECHNICIAN),
    technicianController.getTechnicianBookings
)
router.patch(
    '/bookings/:id',
    auth(Role.TECHNICIAN),
    technicianController.updateBookingStatus
)

// public routes
router.get('/', technicianController.getAllTechnicians)
router.get('/:id', technicianController.getSingleTechnician)


const technicianRouter = router;
export default technicianRouter;