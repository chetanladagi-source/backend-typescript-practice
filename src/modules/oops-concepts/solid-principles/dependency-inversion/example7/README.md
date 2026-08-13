# Example 7 — Avatar uploads

**Scenario:** `AvatarService` validates an avatar's size, names the file and stores it.

**Before:** the arrow pointed `AvatarService -> DiskWriter`, complete with a hard-coded
`/var/www/uploads` path. A move to object storage would have rewritten the validation rules.

**After:** the service depends on the `FileStorage` interface; `LocalDiskStorage` and
`CloudObjectStorage` implement it and each returns its own kind of location.

**Takeaway:** filesystem access is a detail, and so is the URL shape it produces. Behind an
interface, "where files live" becomes a deployment decision instead of a code change.
