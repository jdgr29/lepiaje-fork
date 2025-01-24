export interface Guests {
    name: string,
    gender: string
    check_in?: Date | string,
    check_out?: Date | string,
}

export interface BookingType {
    uuid?: string;
    bookerName?: string;
    bookerEmail?: string;
    bookerPhone?: string;
    bookerGender: string;
    propertyName: string;
    checkIn: Date | undefined | string;
    checkOut: Date | undefined | string;
    numberOfGuests: number;
    totalPaid?: number;
    guests: Guests[];
    dateOfBooking?: Date;
    propertyId: number;
    checkInTime: string;
    checkOutTime: string;
    roomId?: string
}


export interface PriceDetails {
    nights: number,
    pricePerNight: number,
    pricePerGuest: number,
    totalGuests: number,
    totalPrice: number
}


