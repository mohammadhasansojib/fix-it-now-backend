import express from "express"
import authController from "./auth.controller.js"
import { auth } from "../../middlewares/auth.js";
import { Role } from "../../../generated/prisma/enums.js";

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', auth(Role.ADMIN, Role.TECHNICIAN, Role.CUSTOMER), authController.me);

const authRouter = router;
export default authRouter;