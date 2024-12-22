import { ScrollLockManager } from "../ScrollLockManager/ScrollLockManager";

/**
 *  Класс для управления модальными окнами
 *  У модалки должен быть атрибут data-js-modal=${modalName}
 *  У кнопки должен быть атрибут data-js-modal-button=${modalName}
 */
export class ModalManager {
  static instance;

  attrs = {
    modal: "data-js-modal",
    button: "data-js-modal-button",
    closeButton: "data-js-modal-close",
  };

  static stateClasses = {
    open: "visible",
    close: "hidden",
  };

  constructor() {
    if (ModalManager.instance) return ModalManager.instance;
    this.currentModal = null;
    this.#bindEvents();
    ModalManager.instance = this;
  }

  openModal(modalId) {
    const modal = document.querySelector(`[${this.attrs.modal}="${modalId}"]`);
    if (modal) {
      modal.classList.replace(
        ModalManager.stateClasses.close,
        ModalManager.stateClasses.open
      );
      ScrollLockManager.lock();
      this.currentModal = modal;
    }
  }

  closeModal() {
    this.currentModal.classList.replace(
      ModalManager.stateClasses.open,
      ModalManager.stateClasses.close
    );
    ScrollLockManager.unlock();
  }

  #handleClick(e) {
    const { target } = e;

    //открыть модалку
    if (target.hasAttribute(`${this.attrs.button}`)) {
      const modalId = target.getAttribute(this.attrs.button);
      this.openModal(modalId);
      return;
    }

    //закрыть при клике на крестик
    if (target.hasAttribute(this.attrs.closeButton)) {
      const modal = target.closest(`[${this.attrs.modal}]`);
      if (modal) {
        this.closeModal(modal);
      }
      return;
    }

    //закртыть при клике вне области
    const modal = target.closest(`[${this.attrs.modal}]`);
    if (modal && target === modal) {
      this.closeModal(modal);
    }
  }

  #bindEvents() {
    document.addEventListener("click", (e) => {
      this.#handleClick(e);
    });
  }
}
