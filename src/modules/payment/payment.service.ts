import Stripe from "stripe";
import { BookingStatus } from "../../../generated/prisma/enums.js";
import {prisma} from "../../lib/prisma.js"
import {stripe} from "../../lib/stripe.js"
import { AppError, BadRequestError, ForbiddenError, NotFoundError } from "../../utils/errorHandler.js";
import { PaymentProvider, PaymentStatus } from "../../../generated/prisma/enums.js";
import config from "../../config/index.js";


const createConnectedAccount = async (userId: string) => {
    // fetch the user
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            technicianProfile: true,
        },
    });
    if (!user || !user.technicianProfile) {
        throw new NotFoundError("Technician not found");
    }

    if (user.technicianProfile.stripeAccountId) {
        return {
            stripeAccountId: user.technicianProfile.stripeAccountId,
        };
    }

    // create stripe connect account
    const account = await stripe.accounts.create({
        type: "express",
        country: "US",
        email: user.email,
        business_type: "company",
    });

    // update the stripeAccountId in database
    await prisma.technicianProfile.update({
        where: {
            id: user.technicianProfile.id,
        },
        data: {
            stripeAccountId: account.id,
        },
    });



    return {
        stripeAccountId: account.id,
    }

}

const createAccountLink = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      technicianProfile: true,
    },
  });

  if (!user?.technicianProfile?.stripeAccountId) {
    throw new NotFoundError("Stripe account not found.");
  }

  const accountLink = await stripe.accountLinks.create({
    account: user.technicianProfile.stripeAccountId,
    refresh_url: config.payment_refresh_url,
    return_url: config.payment_return_url,
    type: "account_onboarding",
  });

  return {
    url: accountLink.url,
  };
};

const createCheckoutSession = async (bookingId: string, userId: string) => {
    // fetch booking
    const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
            service: true,
            technician: true,
            customer: true,
        },
    });

    if (!booking) {
    throw new NotFoundError("Booking not found.");
    }

    if (!booking.technician.stripeAccountId) {
    throw new BadRequestError("Technician is not connected to Stripe.");
    }
    if (booking.stripeCheckoutSessionId) {
        throw new BadRequestError("Checkout session already exists.");
    }
    if (booking.status !== BookingStatus.ACCEPTED) {
        throw new BadRequestError(
            "Only accepted bookings can be paid."
        );
    }
    if (booking.customerId !== userId) {
        throw new ForbiddenError("You are not allowed to pay for this booking.");
    }

    // create checkout session
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: booking.customer.email,

        line_items: [
            {
            price_data: {
                currency: "usd",
                product_data: {
                name: booking.service.title,
                },
                unit_amount: Math.round(Number(booking.amount) * 100),
            },
            quantity: 1,
            },
        ],

        success_url: config.payment_success_url,
        cancel_url: config.payment_cancel_url,

        metadata: {
            bookingId: booking.id,
        },
    });
    if (!session.url) {
        throw new AppError("Failed to create checkout session.");
    }

    // save the session id and create payment
    await prisma.$transaction(async (tx) => {
        await tx.booking.update({
            where: { id: booking.id },
            data: {
                stripeCheckoutSessionId: session.id,
            },
        });

        await tx.payment.create({
            data: {
                bookingId: booking.id,
                customerId: booking.customerId,
                amount: booking.amount,

                provider: PaymentProvider.STRIPE,
                status: PaymentStatus.PENDING,

                stripeCheckoutSessionId: session.id,
            },
        });
    });


    return {
        checkoutUrl: session.url,
    };
}

const handleWebhook = async (event: Stripe.Event) => {
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;

            const bookingId = session.metadata?.bookingId;

            if (!bookingId) {
                throw new Error("Booking ID not found in metadata.");
            }

            await prisma.$transaction(async (tx) => {
                await tx.booking.update({
                    where: {
                        id: bookingId,
                    },
                    data: {
                        status: BookingStatus.PAID,
                    },
                });

                await tx.payment.update({
                    where: {
                        bookingId,
                    },
                    data: {
                        status: PaymentStatus.COMPLETED,
                        stripePaymentIntentId: session.payment_intent as string,
                        paidAt: new Date(),
                    },
                });
            });

            break;
        }

        default:
            console.log(`Unhandled event: ${event.type}`);
    }
};

const getMyPayments = async (userId: string) => {
    return await prisma.payment.findMany({
        where: {
            customerId: userId,
        },
        include: {
            booking: {
                include: {
                    service: {
                        select: {
                            id: true,
                            title: true,
                            price: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

const getPaymentById = async (paymentId: string, userId: string) => {
    const payment = await prisma.payment.findFirst({
        where: {
            id: paymentId,
            customerId: userId,
        },
        include: {
            booking: {
                include: {
                    service: true,
                    technician: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    username: true,
                                    email: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    if (!payment) {
        throw new NotFoundError("Payment not found.");
    }

    return payment;
};

const paymentService = {
    createConnectedAccount,
    createAccountLink,
    createCheckoutSession,
    handleWebhook,

    getMyPayments,
    getPaymentById,
}
export default paymentService;