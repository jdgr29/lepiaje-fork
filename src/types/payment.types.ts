export interface Payment {
    bookerEmail: string; // Reference to the booking ID
    amount: number; // Total payment amount
    paymentMethod: string // Allowed payment methods
    paymentDate?: Date; // Date of the payment, defaults to the current date
    status: string;
    transactionId?: string; // Transaction ID from the payment gateway (optional)
    additionalDetails?: string,
    createdAt?: Date; // Timestamp when the record was created
    updatedAt?: Date; // Timestamp when the record was last updated
}
