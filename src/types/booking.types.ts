export interface Guests {
    name: string,
    gender: string
    check_in?: Date,
    check_out?: Date,
}

export interface BookingType {
    uuid?: string;
    bookerName?: string;
    bookerEmail?: string;
    bookerPhone?: string;
    bookerGender: string;
    propertyName: string;
    checkIn: Date | undefined;
    checkOut: Date | undefined;
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


