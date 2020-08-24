export class HashTagInput {

  #target; #state;

  constructor (target) {
    this.#target = target;
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

    this.#target
        .on('input', `input[name='search']`, this.searchHash)
        .on('keydown', `input[name='search']`, this.selectHash)
        .on('click', '.searchBtn i', this.searchResult)
        .on('click', '.removeHash', this.removeHash)

  }

  selectHash = e => {

  }

  searchResult = e => {

  }

  searchHash = e => {

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