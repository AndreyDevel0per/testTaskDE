import "./styles";
import { FormHandler } from "./FormHandler/FormHandler";
import { ModalManager } from "./ModalManager/modalManager";
import { isDomReady } from "./utils/isDomReady";

Promise.resolve(isDomReady()).then(() => {
  new FormHandler();
  new ModalManager();
});
