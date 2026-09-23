// State (frontend) — Example 2: a media player, one class per state.
// Same buttons on screen at all times; what they DO is decided by the current state object.

class Player {
  private state: PlayerState;
  public position: number = 0;
  public readonly duration: number = 180;

  constructor() {
    this.state = new StoppedState(this);
  }

  public setState(next: PlayerState): void {
    console.log(`  [${this.state.name} -> ${next.name}]`);
    this.state = next;
  }

  public get stateName(): string {
    return this.state.name;
  }

  // The UI calls these; it never branches on the state itself.
  public play(): void {
    this.state.play();
  }
  public pause(): void {
    this.state.pause();
  }
  public stop(): void {
    this.state.stop();
  }

  // Which controls are enabled is also asked of the state.
  public toolbar(): string {
    const enabled: string[] = this.state.enabledControls();
    return ["play", "pause", "stop"]
      .map((c: string): string => (enabled.includes(c) ? `[${c}]` : ` ${c} `))
      .join(" ");
  }
}

export interface PlayerState {
  readonly name: string;
  play(): void;
  pause(): void;
  stop(): void;
  enabledControls(): string[];
}

class StoppedState implements PlayerState {
  public readonly name: string = "stopped";
  constructor(private readonly player: Player) {}

  public play(): void {
    this.player.position = 0;
    this.player.setState(new PlayingState(this.player));
    console.log("    started from the beginning");
  }
  public pause(): void {
    console.log("    pause ignored — nothing is playing");
  }
  public stop(): void {
    console.log("    already stopped");
  }
  public enabledControls(): string[] {
    return ["play"];
  }
}

class PlayingState implements PlayerState {
  public readonly name: string = "playing";
  constructor(private readonly player: Player) {}

  public play(): void {
    console.log("    already playing");
  }
  public pause(): void {
    this.player.setState(new PausedState(this.player));
    console.log(`    paused at ${this.player.position}s`);
  }
  public stop(): void {
    this.player.position = 0;
    this.player.setState(new StoppedState(this.player));
    console.log("    stopped and rewound");
  }
  public enabledControls(): string[] {
    return ["pause", "stop"];
  }
}

class PausedState implements PlayerState {
  public readonly name: string = "paused";
  constructor(private readonly player: Player) {}

  public play(): void {
    this.player.setState(new PlayingState(this.player));
    console.log(`    resumed from ${this.player.position}s`);
  }
  public pause(): void {
    console.log("    already paused");
  }
  public stop(): void {
    this.player.position = 0;
    this.player.setState(new StoppedState(this.player));
    console.log("    stopped and rewound");
  }
  public enabledControls(): string[] {
    return ["play", "stop"];
  }
}

// ---- Demo ----

const player: Player = new Player();

function show(action: string): void {
  console.log(`\n${action}   toolbar: ${player.toolbar()}  (${player.stateName})`);
}

show("initial");
player.pause(); // ignored
player.play();
show("after play");

player.position = 42;
player.pause();
show("after pause");

player.pause(); // ignored
player.play();
show("after resume");

player.stop();
show("after stop");
console.log("position:", player.position);
