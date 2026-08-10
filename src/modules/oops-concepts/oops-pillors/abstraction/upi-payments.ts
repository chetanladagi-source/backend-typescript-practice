import { Payment } from "./payment";

class UpiPayment extends Payment {

    pay(amount: number): void {
        console.log(`Processing UPI payment of ₹${amount}`);
    }
}