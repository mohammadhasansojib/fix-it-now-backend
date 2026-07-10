import express from "express"
import bookingController from "./booking.controller.js";
import { auth } from "../../middlewares/auth.js";
import { Role } from "../../../generated/prisma/enums.js";


const router = express.Router();

router.use(auth(Role.CUSTOMER))

router.post('/', bookingController.createBooking)
router.get('/', bookingController.getUserBookings)
router.get('/:id', bookingController.getUserBookingById)

const bookingRouter = router;
export default bookingRouter;