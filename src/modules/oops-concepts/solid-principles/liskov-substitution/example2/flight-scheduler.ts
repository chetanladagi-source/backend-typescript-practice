// Consumer that asks only for the capability it needs.

import { Bird } from "./bird";
import { FlyingBird, isFlyingBird } from "./flying-bird";

export function scheduleFlight(bird: FlyingBird): string {
  return bird.fly();
}

export function scheduleMigration(birds: ReadonlyArray<Bird>): void {
  for (const bird of birds) {
    bird.eat();
    if (isFlyingBird(bird)) {
      console.log(scheduleFlight(bird));
    } else {
      console.log(`${bird.species} travels on foot or by water`);
    }
  }
}
