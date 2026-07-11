import express from "express"
import { auth } from "../../middlewares/auth.js";
import { Role } from "../../../generated/prisma/enums.js";
import paymentController from "./payment.controller.js";

const router = express.Router();

router.post(
    '/connect',
    auth(Role.TECHNICIAN),
    paymentController.createConnectAccount
)
router.post(
    '/onboard',
    auth(Role.TECHNICIAN),
    paymentController.createAccountLink
)

router.post(
    '/checkout/:bookingId',
    auth(Role.CUSTOMER),
    paymentController.createCheckoutSession
)

router.post(
    '/webhook',
    paymentController.createWebhook
)

router.get(
    "/",
    auth(Role.CUSTOMER),
    paymentController.getMyPayments
);
router.get(
    "/:id",
    auth(Role.CUSTOMER),
    paymentController.getPaymentById
);

const paymentRouter = router;
export default paymentRouter;