export class Search {

  #target; #state; #searchInput;

  constructor () {
    this.#target = $('.searchCover .search-list');
    this.#searchInput = $('input[name=search]');
    this.setState({
      hashList: []
    });
  }

  #render () {

  }

  #event () {

  }

  setState (state) {
    this.#state = {
      ...state
    };
    this.#render();
    this.#event();
  }
}