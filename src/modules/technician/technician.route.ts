import express from "express"
import technicianController from "./technician.controller.js";

const router = express.Router();

// public routes
router.get('/', technicianController.getAllTechnicians)

const technicianRouter = router;
export default technicianRouter;