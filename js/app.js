import { Search, Papers } from "./components/index.js";
import {PapersService} from "./services";

window.onload = async () => {
	await PapersService.load();
	new Papers();
	new Search();
}