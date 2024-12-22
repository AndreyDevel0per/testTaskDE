/**
 * Класс для валидации форм
 * принимает форму и валидирует все её элементы
 */
export class FormValidator {
  static attrs = {
    inputRequired: "data-js-input-required",
    validationContainer: "data-js-validation-container",
    errorMsg: "data-js-validation-error-message",
  };

  static stateClasses = {
    error: "error",
  };

  constructor() {
    if (FormValidator.instance) return FormValidator.instance;
    FormValidator.instance = this;
  }

  validateForm({ form, isNeedShowErrors = true }) {
    let isFormValid = true;

    Array.from(form.elements).forEach((element) => {
      const requiredType = element.getAttribute(
        FormValidator.attrs.inputRequired
      );
      if (!requiredType) {
        return;
      }

      const isValid = this.getValidationInput(requiredType, element.value);

      if (!isValid) {
        isFormValid = false;

        if (isNeedShowErrors) {
          this.displayError(element, requiredType);
        }
      } else {
        this.clearError(element);
      }
    });

    return isFormValid;
  }

  getValidationInput(type, value) {
    switch (type) {
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "phone":
        return /^\+?\d{1,4}?[-.\s]?(\(?\d{1,4}?\))?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
          value
        );
      case "text":
        return value.trim().length > 0;
      default:
        return true;
    }
  }

  displayError(element, type) {
    const container = element.closest(
      `[${FormValidator.attrs.validationContainer}]`
    );
    if (!container) {
      console.warn(
        `Не найден контейнер для отображения ошибок для элемента`,
        element
      );
      return;
    }

    let errorMsg = container.querySelector(`[${FormValidator.attrs.errorMsg}]`);
    if (!errorMsg) {
      errorMsg = document.createElement("div");
      errorMsg.setAttribute(FormValidator.attrs.errorMsg, "");
      container.appendChild(errorMsg);
    }

    errorMsg.textContent = `Поле ${type} заполнено некорректно`;
    container.classList.add(FormValidator.stateClasses.error);
  }

  clearError(element) {
    const container = element.closest(
      `[${FormValidator.attrs.validationContainer}]`
    );
    if (!container) {
      return;
    }

    const errorMsg = container.querySelector(
      `[${FormValidator.attrs.errorMsg}]`
    );
    if (errorMsg) {
      errorMsg.textContent = "";
    }
    container.classList.remove(FormValidator.stateClasses.error);
  }
}
