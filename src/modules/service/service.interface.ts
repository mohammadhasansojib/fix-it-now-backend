import { Decimal } from "@prisma/client/runtime/client";


export interface ICreateServicePayload {
    title: string,
    description: string,
    price: Decimal,
    durationMinutes: number,
    technicianId: string,
    categoryId: string,
}