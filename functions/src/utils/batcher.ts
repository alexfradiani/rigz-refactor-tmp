/**
 * Utility class to deal with Firestore 500 writes limitation
 */
export default class Batcher {
  readonly limit = 499;
  accumulatedWrites: number;
  db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
    this.accumulatedWrites = 0;
  }

  availableBuffer(): number {
    return this.limit - this.accumulatedWrites;
  }

  async write(collName: string, data: unknown[]): Promise<string[]> {
    const len = data.length;
    let cursor = 0;
    const refIds = [];
    while (cursor < len) {
      const remainder = len - cursor;
      const available = this.availableBuffer();
      const buffer = available > remainder ? remainder : available;

      const batch = this.db.batch();
      for (let i = 0; i < buffer; i++) {
        const ref = this.db.collection(collName).doc();
        refIds.push(ref.id);
        batch.set(ref, data[cursor + i]);
      }

      await batch.commit();
      cursor += buffer;
      this.accumulatedWrites += len;
      await this.wait();
    }

    return refIds;
  }

  async wait(): Promise<NodeJS.Timeout> {
    let milliseconds = 0;

    if (this.availableBuffer() < 1) {
      milliseconds = 1000;
      this.accumulatedWrites = 0; // reset writing count
    }

    return new Promise((res) => setTimeout(res, milliseconds));
  }
}

type Firestore = FirebaseFirestore.Firestore;
