import { Papers } from "./components/Papers.js";
import { PapersService } from "./services/PapersService.js";

window.onload = async () => {
	await PapersService.load();
	new Papers();
}