// Runnable entry point contrasting the fat MediaPlayer contract with playback capabilities.

import { AudioPlayback } from "./audio-playback";
import { AudioPlayer } from "./audio-player";
import { AudioPlayerViolation, MediaPlayer } from "./media-player-violation";
import { Castable } from "./castable";
import { MediaCenterPlayer } from "./media-center-player";
import { SubtitleRenderer, VideoPlayback } from "./video-playback";

console.log("=== Violation ===");
const fatPlayer: MediaPlayer = new AudioPlayerViolation();
fatPlayer.playAudio("nocturne.mp3");
try {
  fatPlayer.playVideo("keynote.mp4");
} catch (error) {
  console.log("[violation] playVideo failed:", (error as Error).message);
}
fatPlayer.showSubtitles("en");
try {
  fatPlayer.castTo("Living Room TV");
} catch (error) {
  console.log("[violation] castTo failed:", (error as Error).message);
}

console.log("=== ISP applied ===");
const mediaCenter: MediaCenterPlayer = new MediaCenterPlayer();
const speakers: AudioPlayback[] = [new AudioPlayer(), mediaCenter];
for (const speaker of speakers) {
  speaker.playAudio("nocturne.mp3");
}

const screen: VideoPlayback = mediaCenter;
const subtitles: SubtitleRenderer = mediaCenter;
const caster: Castable = mediaCenter;
screen.playVideo("keynote.mp4");
subtitles.showSubtitles("en");
caster.castTo("Living Room TV");
