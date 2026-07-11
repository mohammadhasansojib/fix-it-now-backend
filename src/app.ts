import express from "express"
import type { Request, Response, NextFunction } from "express"
import { sendResponse } from "./utils/sendResponse.js"
import httpStatus from "http-status"
import cookieParser from "cookie-parser"
import config from "./config/index.js"
import authRouter from "./modules/auth/auth.route.js"
import adminRouter from "./modules/admin/admin.route.js"
import technicianRouter from "./modules/technician/technician.route.js"
import serviceRouter from "./modules/service/service.route.js"
import categoryRouter from "./modules/category/category.route.js"
import bookingRouter from "./modules/booking/booking.route.js"
import reviewRouter from "./modules/review/review.route.js"
import paymentRouter from "./modules/payment/payment.route.js"


const app = express()

app.use(
    "/api/payments/webhook",
    express.raw({ type: "application/json" })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.cookie_parser_secret));

// routers
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/technicians", technicianRouter);
app.use("/api/services", serviceRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/payments", paymentRouter);


app.get('/', (req: Request, res: Response) => {
    res.send('Server running...');
});

// 404 handling
app.use((req: Request, res: Response) => {
    sendResponse(res, {
        success: false,
        message: "not found",
        statusCode: 404,
        data: null,
    });
})

// global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = Number(err.statusCode) || httpStatus.INTERNAL_SERVER_ERROR;

    sendResponse(res, {
        success: false,
        message: err.message || "Something went wrong!",
        statusCode,
        data: err.error,
    });
})


export default app;