// Only orchestrates the order processing steps.

import { CustomerNotifier } from "./customer-notifier";
import { Order } from "./order-violation";
import { OrderPriceCalculator } from "./order-price-calculator";
import { OrderRepository } from "./order-repository";
import { OrderValidator } from "./order-validator";

export class OrderProcessingService {
  public constructor(
    private readonly validator: OrderValidator,
    private readonly calculator: OrderPriceCalculator,
    private readonly repository: OrderRepository,
    private readonly notifier: CustomerNotifier
  ) {}

  public process(order: Order): boolean {
    const errors: string[] = this.validator.validate(order);
    if (errors.length > 0) {
      console.log("[service] rejected order", order.id + ":", errors.join("; "));
      return false;
    }

    const total: number = this.calculator.total(order.items);
    this.repository.save(order, total);
    this.notifier.confirmOrder(order.customerPhone, order.id, total);
    return true;
  }
}
