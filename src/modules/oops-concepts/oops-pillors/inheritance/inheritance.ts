import { SavingsAccount } from "./saving-account";

const savings = new SavingsAccount(12000);



savings.deposit(2000);

savings.addInterest();

console.log(savings.getBankType());
console.log(savings.getBalance());
