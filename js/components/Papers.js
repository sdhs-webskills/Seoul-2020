import $ from "../jquery-3.4.1.min.js";
import { PapersService } from "../services/PapersService.js";
import { HashTagInput } from './HashTagInput.js';
import { EventBus } from '../EventBus.js';

export class Papers {
  #state; #target; #searchInput;

  constructor (target = $(".contents .cover"), hashTarget = $('.searchCover')) {
    this.#target = target;
    this.#searchInput = new HashTagInput(hashTarget);
    this.setState({
      papers: PapersService.get(),
    });

    EventBus.$on('searchPaper', this.search);
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
			`).join('')
    );
  }

  #event () {
    $('.buyBtn', this.#target)
      .on('click', e => {
        const index = $(e.target).parents('.content').index();
        console.log(this.#state.papers[index]);
      })
  }

  setState ({ papers }) {
    this.#state = {
      papers: papers.map(property => ({
        ...property,
        get src () {
          return `/imgs/papers/${property.image}`;
        }
      }))
    }
    this.#render();
    this.#event();
  }

  search = hashTags => {
    console.log(hashTags);
  }
}