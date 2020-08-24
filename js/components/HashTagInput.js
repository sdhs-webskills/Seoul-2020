export class HashTagInput {

  #target; #state; #searchInput;

  constructor () {
    this.#target = $('.searchCover .search-list');
    this.#hashInput = new HashInput($('.searchCover input[search]'));
    this.setState({
      hashList: [],
      selectedHash: -1,
    });
  }

  #render () {
    const { hashList } = this.#state;
    this.#target.html(
      hashList.map(hash => `
        <div class="hash flex center align left rel">
          <p>${hash}</p>
          <button class="removeHash">X</button>
        </div>
      `)
    );
  }

  #event () {

    $(document)
      .on("input", `${this.target} input[name='search']`, this.Search)
      .on("keydown", `${this.target} input[name='search']`, this.keyDown)
      .on("click", this.target+" .searchBtn i", this.Result)
      .on("click", ".removeHash", this.removeHash)

    this.#searchInput.next('.searchBtn')
        .on('click', this.searching);

  }

  selectHash = e => {

  }

  filterHash = e => {

  }

  searching = e => {

  }

  setState (state) {
    this.#state = {
      ...state
    };
    this.#render();
    this.#event();
  }
}