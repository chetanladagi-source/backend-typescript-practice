
import { CreditCardPayment } from "./payment/CreditCardPayment";
import { UPIPayment } from "./payment/UPIPayment";
import { PayPalPayment } from "./payment/PayPalPayment";
import { processPayment } from "./services/PaymentService";

processPayment(new CreditCardPayment(), 1000);
processPayment(new UPIPayment(), 2000);
processPayment(new PayPalPayment(), 3000);
