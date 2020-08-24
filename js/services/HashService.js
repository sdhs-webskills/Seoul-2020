export const HashService = {
  hashData: [],

  load (papers) {
    const hashData = papers.flatMap(v => v.hash_tags);
    this.set(Array.from(new Set(hashData)));
  },

  set (hashData) {
    this.hashData = hashData;
  },

  get () {
    return this.hashData;
  }
}