export interface BookingType {
    propertyName: string;
    checkIn: Date;
    checkOut: Date;
    numberOfGuests: number;
    totalPaid: number;
    guestsName: string[];
    guestEmail: string;
    guestPhone?: string;
    dateOfBooking: Date;
}





