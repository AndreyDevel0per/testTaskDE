/**
 * Класс для контроля скролла страницы.
 */
export class ScrollLockManager {
  static #cssVar = "--st";

  static #lastPosition = 0;

  static #isLocked = false;

  static instance;

  static stateClasses = {
    noscroll: "noscroll",
  };

  constructor() {
    if (!ScrollLockManager.instance) {
      ScrollLockManager.instance = this;
    }
    return ScrollLockManager.instance;
  }

  static lock() {
    ScrollLockManager.#isLocked = true;
    document.documentElement.style.setProperty(
      ScrollLockManager.#cssVar,
      -1 * document.documentElement.scrollTop + "px"
    );
    ScrollLockManager.#lastPosition = document.documentElement.scrollTop;
    document.documentElement.classList.add(
      ScrollLockManager.stateClasses.noscroll
    );
  }

  static unlock() {
    ScrollLockManager.#isLocked = false;
    document.documentElement.classList.remove(
      ScrollLockManager.stateClasses.noscroll
    );

    window.scrollTo(0, ScrollLockManager.#lastPosition);

    document.documentElement.style.removeProperty(ScrollLockManager.#cssVar);
  }

  get isLocked() {
    return ScrollLockManager.#isLocked;
  }
}
