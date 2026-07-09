import express from "express"
import { auth } from "../../middlewares/auth.js";
import { Role } from "../../../generated/prisma/enums.js";
import adminController from "./admin.controller.js";

const router = express.Router();

router.use(auth(Role.ADMIN));

router.get('/users', adminController.getAllUsers)

const adminRouter = router;
export default adminRouter;