import { HashService } from "./HashService.js";

export const PapersService = {
  papers: [],

  async load () {
    const papers = await fetch('/json/papers.json').then(response => response.json());
    HashService.load(papers);
    this.set(papers);
  },

  set (papers) {
    this.papers = papers;
  },

  get () {
    return this.papers;
  },
}