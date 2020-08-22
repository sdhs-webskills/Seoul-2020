import Hash from "./Hash.js";
import $ from './jquery-3.4.1.min.js';
import Templates from "./Templates.js";

class App {
	#data; #renderer;

	constructor(data, renderer) {
		this.#data = data;
		this.#renderer = renderer;
		this.#data.forEach(this.init)
		this.event();
	}

	init ({ image, ...property }) {
		$(".contents .cover").append(this.#renderer({
			...property,
			src: `/imgs/papers/${image}`
		}));
	}

	buyBtn (e) {
		let tg = $(e.target);
		console.log(tg);
	}

	event () {}
}

window.onload = async () => {
	const data = await fetch("/json/papers.json").then(response => response.json());
	const hashData = [ ...new Set(data.flatMap(v => v.hash_tags)) ];
	const templates = new Templates();
	window.hash = new Hash('.online_store', data, hashData, templates.renderMainList);
	window.app = new App(data, templates.renderHashTags);
}