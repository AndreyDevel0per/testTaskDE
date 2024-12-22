import { defaultRules } from "./config/constants";

/**
 * Класс для валидации форм
 * принимает форму и валидирует все её элементы
 */
export class FormValidator {
  constructor(rules) {
    this.rules = rules || defaultRules;
    this.errors = {};
  }

  validateForm(form) {
    this.errors = {};
    const elements = form.elements;

    for (const fieldName in this.rules) {
      const field = elements[fieldName];

      if (!field) continue;
      if (!field.getAttribute("data-js-input-required") === true) continue;

      const fieldRules = this.rules[fieldName];
      const value = field.value.trim();

      for (const rule of fieldRules) {
        const { type, message, params } = rule;

        if (!this.#applyRule(type, value, params, form)) {
          if (!this.errors[fieldName]) this.errors[fieldName] = [];
          this.errors[fieldName].push(message);
        }
      }
    }

    return Object.keys(this.errors).length === 0;
  }

  getErrors() {
    return this.errors;
  }

  #applyRule(type, value, params, form) {
    switch (type) {
      case "required":
        return value !== "";
      case "minLength":
        return value.length >= params;
      case "maxLength":
        return value.length <= params;
      case "pattern":
        return new RegExp(params).test(value);
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "equals":
        const otherField = form.elements[params];
        return otherField && value === otherField.value;
      default:
        return true;
    }
  }

  displayErrors(form) {
    //удаляет старые ошибки
    form.querySelectorAll(".errorMessage").forEach((el) => el.remove());

    for (const fieldName in this.errors) {
      const field = form.elements[fieldName];
      if (!field) continue;

      const errorMessages = this.errors[fieldName].join(", ");

      const errorElement = document.createElement("div");
      errorElement.className = "errorMessage";
      errorElement.textContent = errorMessages;

      field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
  }
}
