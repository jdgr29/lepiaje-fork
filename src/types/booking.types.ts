
export interface BookingType {
    propertyName: string;
    checkIn: Date | undefined;
    checkOut: Date | undefined;
    numberOfGuests: number;
    totalPaid?: number;
    guests: string[];
    guestEmail?: string;
    guestPhone?: string;
    dateOfBooking?: Date;
}


export interface PriceDetails {
    nights: number,
    pricePerNight: number,
    pricePerGuest: number,
    totalGuests: number,
    totalPrice: number
}


