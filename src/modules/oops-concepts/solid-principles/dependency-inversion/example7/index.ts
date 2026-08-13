// Runnable entry point contrasting the disk-bound avatar service with the injected one.

import { AvatarService } from "./avatar-service";
import { AvatarServiceViolation } from "./avatar-service-violation";
import { CloudObjectStorage } from "./cloud-object-storage";
import { LocalDiskStorage } from "./local-disk-storage";

const smallImage: string = "PNGDATA".repeat(4);

console.log("=== Violation ===");
const hardWired: AvatarServiceViolation = new AvatarServiceViolation();
hardWired.upload("u1", smallImage);
console.log("[violation] exists:", hardWired.exists("u1"));

console.log("=== DIP applied ===");
const onDisk: AvatarService = new AvatarService(new LocalDiskStorage("/var/www/uploads"));
onDisk.upload("u1", smallImage);
console.log("[disk] exists:", onDisk.exists("u1"));

const bucket: CloudObjectStorage = new CloudObjectStorage("user-avatars");
const inCloud: AvatarService = new AvatarService(bucket);
inCloud.upload("u2", smallImage);
console.log("[cloud] rejected oversized:", inCloud.upload("u3", "PNGDATA".repeat(20)));
console.log("[cloud] objects stored:", bucket.objectCount());
