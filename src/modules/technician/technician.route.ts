import express from "express"
import technicianController from "./technician.controller.js";

const router = express.Router();

// public routes
router.get('/', technicianController.getAllTechnicians)
router.get('/:id', technicianController.getSingleTechnician)


const technicianRouter = router;
export default technicianRouter;