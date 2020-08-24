export class Hash {
	#li;
	#val;
	#len;
	constructor(target, data, hashArr) {
		this.dom = new DOM();
		this.target = target;
		this.data = data;
		this.hashArr = hashArr;
		this.eq = -1;
		this.appendHashArr = [];
		this.input = $(`${this.target} input[name='search']`);
		this.strLen = 0;

		this.event();
	}

	Search = e => { // 검색
		this.val = this.input.val();

		this.input.val(this.val.replace(this.val.replace(new RegExp(/^([a-zA-Z0-9ㄱ-ㅎ가-힣_]{0,30})/, "u"), ""), ''));
		this.val = this.input.val();

		if($(".appendHashErr p").hasClass('errAppend') && this.strLen.length != this.val.length)  $(".appendHashErr").empty();
		if($(".appendHashErr p").hasClass('errNum') && this.val.length == 0)  $(".appendHashErr").empty();

		this.strLen = this.val.length;

		$(".search-list").empty();
		this.hashArr.filter(v => v.includes(this.val) && v[1] == this.val[0] && this.val.length >= 2 ).forEach(v => {
			$(".search-list").append(`<div class="normal list rel">${v}</div>`);
		} );
		this.len = $(".search-list .list").length;

	}

	appendRemoveCss = _ => { // 임시로
		if(this.len == 0) {
			this.li = this.val
		}else {
			if(this.eq == -1) this.li = this.val
			else {
				this.li = $(".search-list .list")
					.css({background:"#fff", color:"#555"})
					.eq(this.eq).css({background:"#6898d6", color:"#eee"})
					.text().trim().replace("#", "");
				this.val = this.li;
			}
		}
	}

	appendHash = _ => {// 조건에 맞을 시 Hash 태그 추가하기
		const errDom = $(".appendHashErr");
		let name = this.val.includes("#") ? this.val : "#"+this.val;
		console.log(this.appendHashArr, name);
		if(this.appendHashArr.length == 10) return errDom.html(`<p class="errNum">태그는 10개까지만 추가할 수 있습니다.</p>`);
		else if(this.appendHashArr.filter(v => v == name).length > 0) return errDom.html(`<p class="errAppend">이미 추가한 태그입니다.</p>`);
		else errDom.html(``);

		this.appendHashArr.push(name);
		$(".appendHash").append(this.dom.getHashTags(name));
	}

	keyDown = e => { // input창에서 key누를 시
		switch(e.keyCode) {
			case 9: case 32:// tab, spacebar
				e.preventDefault();
				this.appendHash();
				break;

			case 13: // enter
				e.preventDefault();
				this.appendRemoveCss();
				this.input.val(this.li);
				console.log(this.li);
				this.appendHash();
				break;

			case 38: //up
				e.preventDefault();
				if(this.eq <= 0) this.eq = (this.len - 1);
				else this.eq = this.eq - 1;
				this.appendRemoveCss();
				break;

			case 40: //down
				e.preventDefault();
				if(this.eq >= (this.len - 1)) this.eq = 0;
				else this.eq = this.eq + 1;
				this.appendRemoveCss();
				console.log(this.eq);
				break;
		}
	}

	removeHash = e => { // 추가한 해시태그 지우기
		const tg = $(e.target);

		this.appendHashArr.splice(this.appendHashArr.indexOf(tg.text().trim()), 1);
		tg.parents(".hash").remove();
	}

	Result = _ => {
		this.data.forEach((i, iIdx) => {
			this.appendHashArr.filter((j, jIdx) => i.hash_tags.includes(j)).forEach((j, jIdx) => {
				console.log(j);
			})
		})
	}

	event = _ => { // test
		$(document)
			.on("input", `${this.target} input[name='search']`, this.Search)
			.on("keydown", `${this.target} input[name='search']`, this.keyDown)
			.on("click", this.target+" .searchBtn i", this.Result)
			.on("click", ".removeHash", this.removeHash)
	}
}