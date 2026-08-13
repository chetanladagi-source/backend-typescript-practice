// Runnable entry point contrasting the god class with the SRP version.

import { CartGod, CartItem } from "./cart-violation";
import { CartTotalsCalculator } from "./cart-totals-calculator";
import { CheckoutService } from "./checkout-service";
import { DiscountPolicy } from "./discount-policy";
import { PaymentProcessor } from "./payment-processor";
import { ShoppingCart } from "./shopping-cart";

const items: CartItem[] = [
  { name: "Book", price: 300, quantity: 2 },
  { name: "Pen", price: 50, quantity: 4 }
];

console.log("=== Violation ===");
const god: CartGod = new CartGod();
for (const item of items) {
  god.add(item);
}
god.checkout("SAVE10");

console.log("=== SRP applied ===");
const cart: ShoppingCart = new ShoppingCart();
for (const item of items) {
  cart.add(item);
}
const service: CheckoutService = new CheckoutService(
  new CartTotalsCalculator(),
  new DiscountPolicy(),
  new PaymentProcessor()
);
service.checkout(cart, "SAVE10");
service.checkout(cart, "FLAT100");
