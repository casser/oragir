import { Api } from "./api/Api";
import { App } from "./ui/App";


function start(){
    globalThis.api = new Api();
    globalThis.app = new App(globalThis.api);
}

start()

