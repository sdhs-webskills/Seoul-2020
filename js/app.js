import { Papers } from "./components/Papers";
import { PapersService } from "./services";

window.onload = async () => {
	await PapersService.load();
	new Papers();
}