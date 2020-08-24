import { EventBus } from "../EventBus.js";
import { HashService } from "../services/HashService.js";

const error = {
  already: { state: 'errAppend', text: '이미 추가한 태그입니다.' },
  maximum: { state: 'errNum', text: '태그는 10개까지만 추가할 수 있습니다.' }
}

export class HashTagInput {

  #target; #state; #wrapper;

  constructor (wrapper) {
    this.#wrapper = wrapper;
    this.#target = {
      searchedHashTags: $('.search-list', wrapper),
      appendedHashTags: $('.appendHash', wrapper),
      appendedHashError: $('.appendHashErr', wrapper),
      input: $('input[name=search]', wrapper)
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

  get searchedCount () {
    return this.#state.searched.length;
  }

  get hashTagValue () {
    const { searched, selectedHash } = this.#state;
    return selectedHash !== -1
            ? searched[selectedHash]
            : `#${this.#target.input.val()}`;
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
    const searched = query.length > 1
                      ? HashService.get().filter(tag => tag.indexOf(query) === 1)
                      : [];
    this.setState({
      ...this.#state,
      searched,
      selectedHash: -1
    });
  }

  selectHash = e => {
    const { key } = e;
    try {
      switch (key) {
        case ' ':
        case 'Tab':
        case 'Enter':
          this.validate();
          this.setState({
            ...this.#state,
            selectedHash: -1,
            searched: [],
            appended: [ ...this.#state.appended, this.hashTagValue ]
          })
          this.#target.input.val('');
          e.preventDefault();
          break;
        case 'ArrowUp':
        case 'ArrowDown':
          this.changeSelectedHash(key === 'ArrowDown' ? 1 : -1);
          e.preventDefault();
          break;
      }
    } catch (tagSearchError) {
      this.setState({ ...this.#state, tagSearchError });
    }
  }

  validate () {
    const { appended } = this.#state;
    if (appended.length === 10) {
      throw error.maximum;
    }
    if (appended.find(v => v === this.hashTagValue)) {
      throw error.already;
    }
  }

  changeSelectedHash (increment) {
    let selectedHash = this.#state.selectedHash + increment;
    if (selectedHash < 0) selectedHash = this.searchedCount - 1;
    if (selectedHash >= this.searchedCount) selectedHash = 0;
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