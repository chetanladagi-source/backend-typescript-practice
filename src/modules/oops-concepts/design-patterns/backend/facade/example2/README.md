# Example 2 — Media upload pipeline

**Problem:** publishing a video means validating, transcoding to three resolutions, generating a
thumbnail, and uploading four files to the CDN. No controller should own that.

**Pattern:** `MediaUploadFacade.publish(name, sizeMb)` returns the finished URLs.

**The point of the last demo block:** it deliberately bypasses the facade to do a one-off 720p
transcode. A facade is a convenience, not a wall — the subsystem classes stay public, and pretending
otherwise turns the facade into a bottleneck that grows a method for every special case.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/facade/example2/index.ts`
