# Example 9 — File upload

**Scenario:** accept an upload: validate the file, store the bytes, record the metadata row.

**Violation:** `FileUploadGod` hard-codes the size limit and the allowed extensions next to the blob
map and the metadata table. Moving storage to S3 touches the same class as the upload policy, and the
limits cannot be configured per endpoint.

**Refactor:** `UploadValidator` takes its limits as constructor arguments, `FileStorage` owns the
bytes, `UploadMetadataRepository` owns the audit row, and `FileUploadService` coordinates them.

**Takeaway:** binary storage and metadata are two different stores with two different reasons to
change. Extracting the validator also turned hard-coded rules into configuration.
