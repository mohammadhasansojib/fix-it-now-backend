import type { Request, Response } from "express";
import paymentService from "./payment.service.js";
import { sendResponse } from "../../utils/sendResponse.js";
import httpStatus from "http-status"
import Stripe from "stripe";
import { stripe } from "../../lib/stripe.js";
import config from "../../config/index.js";
import { BadRequestError } from "../../utils/errorHandler.js";


const createConnectAccount = async (req: Request, res: Response) => {
    const id = req.user?.id;

    const result = await paymentService.createConnectedAccount(id);

    sendResponse(res, {
        success: true,
        message: "Connected account created successfully",
        statusCode: httpStatus.OK,
        data: result,
    })
}

const createAccountLink = async (req: Request, res: Response) => {
  const result = await paymentService.createAccountLink(req.user?.id);

  sendResponse(res, {
    success: true,
    message: "Account link created successfully",
    statusCode: httpStatus.OK,
    data: result,
  })
};

const createCheckoutSession = async (req: Request, res: Response) => {
    const bookingId = req.params.bookingId as string;
    const userId = req.user?.id;

    const result = await paymentService.createCheckoutSession(bookingId, userId);

    sendResponse(res, {
        success: true,
        message: "checkout session created successfully",
        statusCode: httpStatus.OK,
        data: result,
    })
}

const createWebhook = async (req: Request, res: Response) => {
    const signature = req.headers["stripe-signature"];

    if (!signature) {
        throw new BadRequestError("Missing Stripe signature.");
    }

    const event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        config.stripe_webhook_secret
    );

    await paymentService.handleWebhook(event);

    res.status(200).json({ received: true });
}

const getMyPayments = async (req: Request, res: Response) => {
    const result = await paymentService.getMyPayments(req.user?.id);

    sendResponse(res, {
        success: true,
        message: "Payments retrieved successfully",
        statusCode: httpStatus.OK,
        data: {
            payments: result,
        },
    });
};

const getPaymentById = async (req: Request, res: Response) => {
    const result = await paymentService.getPaymentById(
        req.params?.id as string,
        req.user?.id
    );

    sendResponse(res, {
        success: true,
        message: "Payment retrieved successfully",
        statusCode: httpStatus.OK,
        data: {
            payment: result,
        },
    });
};

const paymentController = {
    createConnectAccount,
    createAccountLink,
    createCheckoutSession,
    createWebhook,

    getMyPayments,
    getPaymentById,
}
export default paymentController;