import "./styles";
import "../css/global.scss";
import { ModalManager } from "./ModalManager/modalManager";
import { isDomReady } from "./utils/isDomReady";

Promise.resolve(isDomReady()).then(() => {
  console.debug("dom ready");
  new ModalManager();
});
