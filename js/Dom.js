export default class Dom {

	mainList(obj) {
		return `<div class="content flex center rel" data-id ="${obj.id}">
		<div class="img-box rel"><img src="${obj.src}" alt="${obj.src}" title="${obj.src}"></div>
		<div class="box rel">
		<p><b>이름:</b> <span class="name">${obj.paper_name}</span></p>
		<p><b>업체명:</b> <span>${obj.company_name}</span></p>
		<p><b>가로/세로 사이즈:</b> <br> <span>${obj.width_size} / ${obj.height_size}</span></p>
		<p><b>포인트:</b> <span>${obj.point}</span></p>
		<p><b>해시태그:</b> ${[...obj.hash_tags]}</p>
		<button type="button" class="buyBtn">구매하기</button>
		</div>
		</div>`;
	}

	getHashTags(name) {
		return `
		<div class="hash flex center align left rel">
		<p>${name}</p>
		<button class="removeHash">X</button>
		</div>`;
	}
}