import express from "express"
import serviceController from "./service.controller.js";


const router = express.Router();

router.get('/', serviceController.getAllServices)

const serviceRouter = router;
export default serviceRouter;