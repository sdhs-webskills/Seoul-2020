export default class Templates {

	renderMainList({ id, src, paper_name, company_name, width_size, height_size, point, hash_tags }) {
		return `
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
		`;
	}

	renderHashTags(name) {
		return `
			<div class="hash flex center align left rel">
				<p>${name}</p>
				<button class="removeHash">X</button>
			</div>
		`;
	}
}