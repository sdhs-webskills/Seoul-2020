import Hash from "./Hash.js";
import $ from './jquery-3.4.1.min.js';
import Templates from "./Templates.js";

class App {
	#data; #hash; #hashArr; #templates;

	constructor(templates) {
		this.#hashArr = [];
		this.#templates = templates;

		fetch("/json/papers.json")
			.then(response => response.json())
			.then(this.init)
	}

	Create ({ image, ...property }) {
		$(".contents .cover").append(this.#templates.renderMainList({
			...property,
			src: `/imgs/papers/${image}`
		}));
	}

	buyBtn (e) {
		let tg = $(e.target);
		console.log(tg);
	}

	event () {

	}

	init (data) {
		this.#data = data;
		this.#data.forEach(this.Create);
		this.#hashArr = [ ...new Set(data.flatMap(v => v.hash_tags)) ]
		this.#hash = new Hash(".online_store", this.#data, this.#hashArr);
		this.event();
	}

}

window.onload = () => {
	window.app = new App(new Templates());
}