import { CreditCardPayment } from "./CreditCardPayment";
import { UPIPayment } from "./UPIPayment";

const creditCardPayment = new CreditCardPayment(1000);

creditCardPayment.pay();

const upiPayment = new UPIPayment(500);

upiPayment.pay();
