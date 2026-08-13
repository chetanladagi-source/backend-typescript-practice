// Runnable entry point contrasting the fat Animal contract with movement capabilities.

import { Animal, DogViolation } from "./animal-violation";
import { Dog } from "./dog";
import { Duck } from "./duck";
import { Flyer } from "./flyer";
import { Runner } from "./runner";
import { Swimmer } from "./swimmer";

console.log("=== Violation ===");
const fatDog: Animal = new DogViolation();
fatDog.run(100);
fatDog.swim(20);
try {
  fatDog.fly(50);
} catch (error) {
  console.log("[violation] fly failed:", (error as Error).message);
}

console.log("=== ISP applied ===");
const dog: Dog = new Dog();
const duck: Duck = new Duck();

const runners: Runner[] = [dog, duck];
for (const runner of runners) {
  runner.run(100);
}

const swimmers: Swimmer[] = [dog, duck];
for (const swimmer of swimmers) {
  swimmer.swim(20);
}

const flyers: Flyer[] = [duck];
for (const flyer of flyers) {
  flyer.fly(50);
}
