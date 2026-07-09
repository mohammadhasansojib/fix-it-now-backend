import express from "express"
import { auth } from "../../middlewares/auth.js";
import { Role } from "../../../generated/prisma/enums.js";
import adminController from "./admin.controller.js";

const router = express.Router();

router.use(auth(Role.ADMIN));

router.get('/users', adminController.getAllUsers)
router.patch('/users/:id', adminController.updateUserStatus)
router.get('/bookings', adminController.getAllBookings)

const adminRouter = router;
export default adminRouter;