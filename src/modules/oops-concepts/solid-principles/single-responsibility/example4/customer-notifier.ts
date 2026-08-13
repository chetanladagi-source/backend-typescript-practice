// Only tells the customer what happened.

export class CustomerNotifier {
  public confirmOrder(phone: string, orderId: string, total: number): void {
    console.log("[notifier] SMS to", phone, ": order", orderId, "confirmed for", total.toFixed(2));
  }
}
