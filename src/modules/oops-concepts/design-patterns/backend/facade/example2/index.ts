// Facade — Example 2: media upload pipeline.
// Five steps, one method. The subsystem stays reachable for advanced callers.

class FileValidator {
  public validate(name: string, sizeMb: number): void {
    if (sizeMb > 500) {
      throw new Error(`${name} exceeds the 500MB limit`);
    }
    console.log(`  [validate] ${name} ok (${sizeMb}MB)`);
  }
}

class Transcoder {
  public toMp4(name: string, resolution: string): string {
    console.log(`  [transcode] ${name} -> ${resolution} mp4`);
    return `${name.split(".")[0]}-${resolution}.mp4`;
  }
}

class ThumbnailGenerator {
  public capture(name: string, atSecond: number): string {
    console.log(`  [thumbnail] frame at ${atSecond}s`);
    return `${name.split(".")[0]}-thumb.jpg`;
  }
}

class CdnUploader {
  public upload(fileName: string): string {
    const url: string = `https://cdn.example.com/${fileName}`;
    console.log(`  [cdn] uploaded ${fileName}`);
    return url;
  }
}

export interface UploadResult {
  videoUrls: string[];
  thumbnailUrl: string;
}

// --- Facade ---
export class MediaUploadFacade {
  private readonly validator: FileValidator = new FileValidator();
  private readonly transcoder: Transcoder = new Transcoder();
  private readonly thumbnails: ThumbnailGenerator = new ThumbnailGenerator();
  private readonly cdn: CdnUploader = new CdnUploader();

  public publish(name: string, sizeMb: number): UploadResult {
    this.validator.validate(name, sizeMb);

    const videoUrls: string[] = ["1080p", "720p", "480p"].map((res: string): string =>
      this.cdn.upload(this.transcoder.toMp4(name, res)),
    );

    const thumbnailUrl: string = this.cdn.upload(this.thumbnails.capture(name, 3));

    return { videoUrls, thumbnailUrl };
  }
}

// ---- Demo ----

const media: MediaUploadFacade = new MediaUploadFacade();

console.log("publishing lecture.mov:");
const result: UploadResult = media.publish("lecture.mov", 120);
console.log("=>", result);

console.log("publishing an oversized file:");
try {
  media.publish("raw-footage.mov", 900);
} catch (err) {
  console.log("=>", (err as Error).message);
}

// The subsystem is still public: a caller with an unusual need can skip the facade.
console.log("one-off 720p transcode without the facade:");
console.log("=>", new CdnUploader().upload(new Transcoder().toMp4("clip.mov", "720p")));
