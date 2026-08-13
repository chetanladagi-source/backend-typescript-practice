// Only keeps rendered invoices in the in-memory store.

export class InvoiceRepository {
  private readonly documents: string[] = [];

  public save(document: string): void {
    this.documents.push(document);
    console.log("[repository] persisted invoice, stored count:", this.documents.length);
  }

  public count(): number {
    return this.documents.length;
  }
}
