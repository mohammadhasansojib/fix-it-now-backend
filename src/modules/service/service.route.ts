import express from "express";
import serviceController from "./service.controller.js";
import { auth } from "../../middlewares/auth.js";
import { Role } from "../../../generated/prisma/enums.js";

const router = express.Router();

router.get("/", serviceController.getAllServices);

router.use(auth(Role.TECHNICIAN));

router.post("/", serviceController.createService);

const serviceRouter = router;
export default serviceRouter;