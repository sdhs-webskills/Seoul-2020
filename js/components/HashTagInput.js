import { EventBus } from "../EventBus.js";

export class HashTagInput {

  #target; #state; #wrapper;

  constructor (wrapper) {
    this.#wrapper = wrapper;
    this.#target = $('.search-list', this.#wrapper);
    this.setState({
      hashTags: [],
      selectedHash: -1,
    });
  }

  get hashTagsCount () {
    return this.#state.hashTags.length;
  }

  #render () {
    const { hashTags, selectedHash } = this.#state;
    this.#target.html(
      hashTags.map((hash, key) => `
        <div class="hash flex center align left rel" ${key === selectedHash ? ` style="background: #6898d6; color: #eee"` : ''}>
          <p>${hash}</p>
          <button class="removeHash">X</button>
        </div>
      `)
    );
  }

  #event () {
    this.#wrapper
        .off() // 모든 이벤트 제거 후 다시 등록
        .on('input', `input[name='search']`, this.searchHash)
        .on('keydown', `input[name='search']`, this.selectHash)
        .on('click', '.searchBtn i', this.searchResult)
        .on('click', '.removeHash', this.removeHash);
  }

  searchHash = () => {

  }

  selectHash = ({ key }) => {
    switch (key) {
      case ' ':
      case 'Tab':
        console.log('submit');
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        this.changeSelectedHash((key === 'ArrowUp') * 1);
        break;
    }
  }

  changeSelectedHash (increment) {
    let selectedHash = this.#state.selectedHash + increment;
    if (selectedHash < 0) selectedHash = this.hashTagsCount - 1;
    if (selectedHash >= this.hashTagsCount) selectedHash = 0;
    this.setState({
      ...this.#state,
      selectedHash
    });
  }

  searchResult = e => {
    EventBus.$emit('searchPaper', this.#state.hashTags)
  }

  removeHash = e => {

  }

  setState (state) {
    this.#state = {
      ...state
    };
    this.#render();
    this.#event();
  }
}