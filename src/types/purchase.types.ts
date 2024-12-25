export interface PurchaseType {
    uuid: string;
    productName: string;
    productId: string;
    amountOfProduct: number;
    amountPaid: number;
    clientEmail: string;
    clientNumber?: string;
    purchasedOn: Date;
    stripeId: string;
}

