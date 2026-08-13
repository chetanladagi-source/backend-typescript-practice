// Player that genuinely supports audio, video, subtitles and casting.

import { AudioPlayback } from "./audio-playback";
import { Castable } from "./castable";
import { SubtitleRenderer, VideoPlayback } from "./video-playback";

export class MediaCenterPlayer implements AudioPlayback, VideoPlayback, SubtitleRenderer, Castable {
  public playAudio(track: string): void {
    console.log("[media-center] playing track:", track);
  }

  public playVideo(clip: string): void {
    console.log("[media-center] playing clip:", clip);
  }

  public showSubtitles(language: string): void {
    console.log("[media-center] subtitles enabled:", language);
  }

  public castTo(deviceName: string): void {
    console.log("[media-center] casting to", deviceName);
  }
}
