
export interface OrderDetailsModel {
    id: string;
    userId: number;
    userName: string;
    contactNumber: string;
    emailId: string;
    cid: string;
    calculatedAmount: number;
    createdAt: number;
    courseId: string;
    courseTitle: string;
    orderStatus: string;
    paymentStatus: string;
    orderDetails: {
        clientIdentifier: string;
        totalAmount: number;
        discountAmount: number;
        afterDiscountAmount: number;
        gstAmount: number;
        shippingAmount: number;
        finalAmount: number;
        cgst: number;
        sgst: number;
        igst: number;
        cgstAmount: number;
        sgstAmount: number;
        igstAmount: number;
    };
}
