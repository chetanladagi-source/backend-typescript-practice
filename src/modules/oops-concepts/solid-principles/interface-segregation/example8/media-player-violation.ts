// Fat player contract covering every playback feature.

export interface MediaPlayer {
  playAudio(track: string): void;
  playVideo(clip: string): void;
  showSubtitles(language: string): void;
  castTo(deviceName: string): void;
}

// ISP violation: an audio-only player must implement three video-era features.
export class AudioPlayerViolation implements MediaPlayer {
  public playAudio(track: string): void {
    console.log("[violation-audio] playing track:", track);
  }

  public playVideo(clip: string): void {
    throw new Error(`Audio-only player cannot play video "${clip}"`);
  }

  public showSubtitles(language: string): void {
    console.log("[violation-audio] showSubtitles(", language, ") is a meaningless no-op");
  }

  public castTo(deviceName: string): void {
    throw new Error(`Audio-only player cannot cast to ${deviceName}`);
  }
}
