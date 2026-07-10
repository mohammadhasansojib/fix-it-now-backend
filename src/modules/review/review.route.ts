import express from "express"
import reviewController from "./review.controller.js";
import { Role } from "../../../generated/prisma/enums.js";
import { auth } from "../../middlewares/auth.js";

const router = express.Router();

router.use(auth(Role.CUSTOMER));

router.post("/", reviewController.createReview)

const reviewRouter = router;
export default reviewRouter;