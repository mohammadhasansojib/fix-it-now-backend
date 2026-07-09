import express from "express"
import categoryController from "./category.controller.js";

const router = express.Router();


router.get('/', categoryController.getAllCategories)


const categoryRouter = router;
export default categoryRouter;