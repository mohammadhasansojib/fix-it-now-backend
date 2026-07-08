import express from "express"
import authController from "./auth.controller.js"

const router = express.Router();

router.post('/register', authController.register);

const authRouter = router;
export default authRouter;