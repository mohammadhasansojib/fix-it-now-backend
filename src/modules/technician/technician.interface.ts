


export interface ITechnicianProfileUpdatePayload {
    bio?: string,
    profilePhoto?: string,
    price?: number,
    skills?: string[],
    experience?: number,
}

export interface ICreateSlotPayload {
    dayOfWeek: number,
    startTime: string,
    endTime: string,
    technicianId: string,
}