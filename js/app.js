import Hash from "./Hash.js";
import $ from './jquery-3.4.1.min.js';
import Templates from "./Templates.js";

class App {
	#state; #target;

	constructor (papers) {
		this.#state = {
			papers: papers.map(property => ({
				...property,
				get src () {
					return `/imgs/papers/${property.image}`;
				}
			}))
		}
		this.#target = $(".contents .cover");
		this.#render();
		this.#event();
	}

	#render () {
		this.#target.html(
			this.#state.papers.map(({ id, src, paper_name, company_name, width_size, height_size, point, hash_tags }) => `
				<div class="content flex center rel" data-id ="${id}">
					<div class="img-box rel"><img src="${src}" alt="${src}" title="${src}"></div>
					<div class="box rel">
						<p><b>이름:</b> <span class="name">${paper_name}</span></p>
						<p><b>업체명:</b> <span>${company_name}</span></p>
						<p><b>가로/세로 사이즈:</b> <br> <span>${width_size} / ${height_size}</span></p>
						<p><b>포인트:</b> <span>${point}</span></p>
						<p><b>해시태그:</b> ${hash_tags.map(v => `<span class="hash">${v}</span>`)}</p>
						<button type="button" class="buyBtn">구매하기</button>
					</div>
				</div>
			`)
		)
	}

	#event () {
		$('.buyBtn', this.#target)
			.on('click', e => {
				const index = $(e.target).parents('.content').index();
				console.log(this.#state.papers[index]);
			})
	}
}

window.onload = async () => {
	const papers = await fetch("/json/papers.json").then(response => response.json());
	const hashData = [ ...new Set(papers.flatMap(v => v.hash_tags)) ];
	const templates = new Templates();
	window.hash = new Hash('.online_store', papers, hashData, templates.renderHashTags);
	window.app = new App(papers);
}