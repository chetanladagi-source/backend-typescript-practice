// Player that only promises audio playback.

import { AudioPlayback } from "./audio-playback";

export class AudioPlayer implements AudioPlayback {
  public playAudio(track: string): void {
    console.log("[audio-player] playing track:", track);
  }
}
