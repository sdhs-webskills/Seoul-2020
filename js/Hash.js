export default class Hash {
	#li; #val; #listLength; #target; #data; #hashData; #renderer;
	#eq; #appendHashArr; #valueLength; #input; #searchList;

	constructor(target, data, hashData, renderer) {
		this.#target = target;
		this.#hashData = hashData;
		this.#renderer = renderer;
		this.#eq = -1;
		this.#appendHashArr = [];
		this.#input = $(`${target} input[name='search']`);
		this.#valueLength = 0;
		this.#searchList = $('.search-list');

		this.event();
	}

	Result () {
		this.#data.forEach(({ hash_tags }) => {
			this.#appendHashArr
					.filter(hash => hash_tags.includes(hash))
				  .forEach(console.log);
		})
	}

	event () { // test
		const { target, Search, keyDown, Result, removeHash } = this;
		$(document)
		   .on("input", `${target} input[name='search']`, Search)
		   .on("keydown", `${target} input[name='search']`, keyDown)
		   .on("click", `${target} .searchBtn i`, Result)
		   .on("click", ".removeHash", removeHash)
	}

	Search = () => { // 검색
		const value = this.#val;
		this.#val = value.replace(value.replace(new RegExp(/^([a-zA-Z0-9ㄱ-ㅎ가-힣_]{0,30})/, "u"), ""), '');
		this.#input.val(this.#val);

		const hashError = $(".appendHashErr p");
		const valueLength = this.#val.length;

		if(
			(hashError.hasClass('errAppend') && this.#valueLength !== valueLength) ||
			(hashError.hasClass('errNum') && valueLength === 0)
		) $(".appendHashErr").empty();

		this.#searchList.html(
			this.#hashData
			    .filter(v => v.includes(this.#val) && v[1] === this.#val[0] && valueLength >= 2 )
			    .map(v => `<div class="normal list rel">${v}</div>`)
			    .join('')
		);

		this.#listLength = $(".search-list .list").length;

	}

	appendRemoveCss = _ => { // 임시로
		if (this.#listLength === 0 || this.#eq === -1) {
			this.#li = this.#val
			return;
		}

		const target = $(".list", this.#searchList)
		                  .css({background: "#fff", color: "#555"})
			                .eq(this.#eq)
			                   .css({background: "#6898d6", color: "#eee"});

		this.#val =
		this.#li  = target.text()
		                  .trim()
		                  .replace("#", "");
	}

	appendHash = _ => {// 조건에 맞을 시 Hash 태그 추가하기
		const errDom = $(".appendHashErr");
		let name = this.#val.includes("#") ? this.#val : "#"+this.#val;
		console.log(this.#appendHashArr, name);
		if(this.#appendHashArr.length == 10) return errDom.html(`<p class="errNum">태그는 10개까지만 추가할 수 있습니다.</p>`);
		else if(this.#appendHashArr.filter(v => v == name).length > 0) return errDom.html(`<p class="errAppend">이미 추가한 태그입니다.</p>`);
		else errDom.html(``);

		this.#appendHashArr.push(name);
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
				if(this.#eq <= 0) this.#eq = (this.#listLength - 1);
				else this.#eq = this.#eq - 1;
				this.appendRemoveCss();
				break;

			case 40: //down
				e.preventDefault();
				if(this.#eq >= (this.#listLength - 1)) this.#eq = 0;
				else this.#eq = this.#eq + 1;
				this.appendRemoveCss();
				console.log(this.#eq);
				break;
		}
	}

	removeHash = e => { // 추가한 해시태그 지우기
		const tg = $(e.target);

		this.#appendHashArr.splice(this.#appendHashArr.indexOf(tg.text().trim()), 1);
		tg.parents(".hash").remove();
	}
}