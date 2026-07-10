import { Decimal } from "@prisma/client/runtime/client";


export interface ICreateBookingPayload {
    startTime: Date,
    endTime?: Date,
    serviceId: string,
    customerId: string,
    technicianId?: string,
    amount?: Decimal,
}