// Video-specific capabilities.

export interface VideoPlayback {
  playVideo(clip: string): void;
}

export interface SubtitleRenderer {
  showSubtitles(language: string): void;
}
