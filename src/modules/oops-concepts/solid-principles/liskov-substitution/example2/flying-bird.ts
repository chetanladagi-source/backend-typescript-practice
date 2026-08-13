// Flight is an optional capability layered on top of Bird.

import { Bird } from "./bird";

export interface FlyingBird extends Bird {
  fly(): string;
}

export function isFlyingBird(bird: Bird): bird is FlyingBird {
  return typeof (bird as FlyingBird).fly === "function";
}
