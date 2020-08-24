import { EventBus } from "../EventBus.js";
import { HashService } from "../services/HashService.js";

export class HashTagInput {

  #target; #state; #wrapper;

  constructor (wrapper) {
    this.#wrapper = wrapper;
    this.#target = {
      searchedHashTags: $('.search-list', this.#wrapper),
      appendedHashTags: $('.appendHash', this.#wrapper),
      appendedHashError: $('.appendHashErr', this.#wrapper),
    }
    this.setState({
      searched: [],
      selectedHash: -1,
      appended: [],
      tagSearchError: {
        state: 'normal',
        text: '',
      },
    });
  }

  get hashTagsCount () {
    return this.#state.hashTags.length;
  }

  #render () {
    const { searched, selectedHash, appended, tagSearchError } = this.#state;
    const { searchedHashTags, appendedHashTags, appendedHashError } = this.#target;

    searchedHashTags.html(
      searched.map((tag, key) => `
        <div class="normal list rel" ${key === selectedHash ? ` style="background: #6898d6; color: #eee"` : ''}>
          ${tag}
        </div>
      `).join('')
    );

    appendedHashTags.html(
      appended.map(tag => `
        <div class="hash flex center align left rel">
          <p>${tag}</p>
          <button class="removeHash">X</button>
        </div>
      `).join('')
    );

    const { state, text } = tagSearchError;
    appendedHashError.empty();
    if (state !== 'normal') {
      appendedHashError.html(`<p class="${state}">${text}</p>`);
    }

  }

  #event () {
    this.#wrapper
        .off() // 모든 이벤트 제거 후 다시 등록
        .on('input', `input[name='search']`, this.searchHash)
        .on('keydown', `input[name='search']`, this.selectHash)
        .on('click', '.searchBtn i', this.searchResult)
        .on('click', '.removeHash', this.removeHash);
  }

  searchHash = ({ target }) => {
    const query = target.value.replace(/([^a-zA-Z0-9ㄱ-ㅎ가-힣_]+)/gi, '');
    target.value = query;
    if (query.length < 2) return;
    const searched = HashService.get().filter(tag => tag.indexOf(query) === 1);
    this.setState({ ...this.#state, searched });
  }

  validate () {}

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