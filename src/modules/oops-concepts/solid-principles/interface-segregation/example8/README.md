# Example 8 — Media players

**Scenario:** A `MediaPlayer` interface requires `playAudio`, `playVideo`, `showSubtitles` and
`castTo`, so a lightweight audio player must implement the entire home-theatre feature set.

**Dead weight:** `playVideo` and `castTo` throw on `AudioPlayerViolation`, while `showSubtitles`
quietly does nothing.

**Fix:** Split into `AudioPlayback`, `VideoPlayback`, `SubtitleRenderer` and `Castable`.
`AudioPlayer` implements one; `MediaCenterPlayer` implements all four.

**Takeaway:** A playlist screen only needs `AudioPlayback`, so it should not be coupled to
subtitle and casting features it never touches.
