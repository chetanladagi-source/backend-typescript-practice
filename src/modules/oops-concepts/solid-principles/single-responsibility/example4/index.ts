// Runnable entry point contrasting the god class with the SRP version.

import { CustomerNotifier } from "./customer-notifier";
import { Order, OrderGod } from "./order-violation";
import { OrderPriceCalculator } from "./order-price-calculator";
import { OrderProcessingService } from "./order-processing-service";
import { OrderRepository } from "./order-repository";
import { OrderValidator } from "./order-validator";

const orders: Order[] = [
  {
    id: "ORD-1",
    customerPhone: "+911234567890",
    items: [
      { sku: "SKU-A", price: 3000, quantity: 2 },
      { sku: "SKU-B", price: 500, quantity: 1 }
    ]
  },
  { id: "ORD-2", customerPhone: "+919876543210", items: [] }
];

console.log("=== Violation ===");
const god: OrderGod = new OrderGod();
for (const order of orders) {
  god.process(order);
}

console.log("=== SRP applied ===");
const repository: OrderRepository = new OrderRepository();
const service: OrderProcessingService = new OrderProcessingService(
  new OrderValidator(),
  new OrderPriceCalculator(5000, 0.05),
  repository,
  new CustomerNotifier()
);
for (const order of orders) {
  service.process(order);
}
console.log("[service] stored orders:", repository.count());
