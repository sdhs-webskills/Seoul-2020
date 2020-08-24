import { Hash, Papers } from "./components/index.js";
import Templates from "./Templates.js";

window.onload = async () => {
	const papersData = await fetch("/json/papers.json").then(response => response.json());
	const hashData = [ ...new Set(papersData.flatMap(v => v.hash_tags)) ];
	const templates = new Templates();
	window.hash = new Hash('.online_store', papersData, hashData, templates.renderHashTags);
	window.app = new Papers(papersData);
}