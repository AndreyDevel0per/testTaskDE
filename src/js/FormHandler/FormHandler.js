import { ModalManager } from "../ModalManager/modalManager";

/**
 * Класс для отправки данных с формы
 */
export class FormHandler {
  static instance;

  attrs = {
    form: "data-js-form",
  };

  constructor() {
    if (FormHandler.instance) return FormHandler.instance;
    this.#bindEvents();
    this.modalManager = new ModalManager();
    FormHandler.instance = this;
  }

  static getInstance() {
    if (!FormHandler.instance) {
      FormHandler.instance = new FormHandler();
    }
    return FormHandler.instance;
  }

  #handleSubmit(e) {
    const { target, submitter } = e;

    if (!target.hasAttribute(`${this.attrs.form}`)) return;
    if (!target.tagName.toLowerCase() === "form") return;

    const cfg = JSON.parse(target.getAttribute(this.attrs.form));
    const {
      url,
      method = "POST",
      showModalAfterSuccess,
      showModalAfterError,
      preventDefault = true,
      redirectUrlAfterSuccess = false,
      delayBeforeRedirect = false,
    } = cfg;

    const data = new FormData(target);

    if (preventDefault) {
      e.preventDefault();
    }

    submitter.disabled = true;

    fetch(url, {
      method,
      body: data,
    })
      .then((res) => {
        if (res.ok) {
          if (showModalAfterSuccess) {
            this.modalManager.closeModal();
            this.modalManager.openModal(showModalAfterSuccess);
          }
        } else {
          this.modalManager.closeModal();
          this.modalManager.openModal(showModalAfterError);
        }
        if (redirectUrlAfterSuccess) {
          if (delayBeforeRedirect) {
            setTimeout(() => {
              location.href = redirectUrlAfterSuccess;
            }, delayBeforeRedirect);
          } else {
            location.href = redirectUrlAfterSuccess;
          }
        }
      })
      .finally(() => {
        submitter.disabled = false;
      });
  }

  #bindEvents() {
    document.addEventListener(
      "submit",
      (e) => {
        this.#handleSubmit(e);
      },
      true
    );
  }
}
