import { FormValidator } from "../FormValidator/FormValidator";
import { ModalManager } from "../ModalManager/modalManager";

/**
 * Класс для отправки данных с формы
 */
export class FormHandler {
  static instance;

  attrs = {
    form: "data-js-form",
    needValidation: "data-js-form-validation-required",
  };

  constructor() {
    if (FormHandler.instance) return FormHandler.instance;
    this.#bindEvents();
    this.modalManager = new ModalManager();
    this.formValidator = new FormValidator();
    FormHandler.instance = this;
  }

  static getInstance() {
    if (!FormHandler.instance) {
      FormHandler.instance = new FormHandler();
    }
    return FormHandler.instance;
  }

  #getFormConfig(form) {
    return JSON.parse(form.getAttribute(this.attrs.form)) || {};
  }

  #validateForm(target) {
    return this.formValidator.validateForm({
      form: target,
    });
  }

  async #sendForm(config, data) {
    const { url, method = "POST" } = config;
    return fetch(url, {
      method,
      body: data,
    });
  }

  #handleSuccess(config, form) {
    const {
      showModalAfterSuccess,
      redirectUrlAfterSuccess,
      delayBeforeRedirect,
    } = config;

    form.reset();

    if (showModalAfterSuccess) {
      this.modalManager.closeModal();
      this.modalManager.openModal(showModalAfterSuccess);
    }
    if (redirectUrlAfterSuccess) {
      this.#redirect(redirectUrlAfterSuccess, delayBeforeRedirect);
    }
  }

  #handleError(config) {
    if (config.showModalAfterError) {
      this.modalManager.closeModal();
      this.modalManager.openModal(config.showModalAfterError);
    }
  }

  #redirect(url, delay) {
    if (delay) {
      setTimeout(() => {
        location.href = url;
      }, delay);
    } else {
      location.href = url;
    }
  }

  #handleSubmit(e) {
    const { target, submitter } = e;

    if (
      !target.hasAttribute(`${this.attrs.form}`) ||
      !target.tagName.toLowerCase() === "form"
    ) {
      return;
    }

    const cfg = this.#getFormConfig(target);

    if (cfg.isAjaxForm) {
      e.preventDefault();
    }

    if (
      target.hasAttribute(this.attrs.needValidation) &&
      !this.#validateForm(target)
    ) {
      return;
    }

    submitter.disabled = true;

    this.#sendForm(cfg, new FormData(target))
      .then((res) =>
        res.ok ? this.#handleSuccess(cfg, target) : this.#handleError(cfg)
      )
      .catch((err) => {
        console.error(err);
        this.#handleError(cfg);
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
