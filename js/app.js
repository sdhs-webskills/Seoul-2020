import Hash from "/js/Hash.js";
import DOM from "/js/Dom.js";

(() => {
	class App {
		#data;
		#hash;
		constructor() {
			this.hashArr = [];
			this.dom = new DOM();

			fetch("/json/papers.json")
			.then(file => file.json())
			.then(data => this.init(data))
		}

		Create = ({id, image, paper_name, company_name, width_size, height_size, point, hash_tags}) => {
			$(".contents .cover").append(this.dom.mainList({
				id:id,
				src:`/imgs/papers/${image}`,
				paper_name:paper_name,
				company_name:company_name,
				width_size:width_size,
				height_size:height_size,
				point:point,
				hash_tags:hash_tags.map(v => `<span class="hash">${v}</span>`)
			}));
		}

		buyBtn = e => {
			let tg = $(e.target);
			console.log(tg);
		}

		event = _ => {
			
		}

		init = data => {
			this.data = data;
			this.data.forEach(v => {
				this.hashArr.push(...v.hash_tags);
				this.Create(v);
			});

			this.hashArr = Array.from(new Set(this.hashArr));
			this.hash = new Hash(".online_store", this.data, this.hashArr);
			this.event();
		}

	}

	window.onload = _ => window.app = new App();
})();