export const defaultRules = {
  userName: [
    { type: "required", message: "Имя пользователя обязательно" },
    {
      type: "minLength",
      params: 3,
      message: "Имя должно быть не менее 3 символов",
    },
    {
      type: "maxLength",
      params: 20,
      message: "Имя не должно превышать 20 символов",
    },
  ],
  email: [
    { type: "required", message: "Электронная почта обязательна" },
    { type: "email", message: "Введите корректный адрес электронной почты" },
  ],
  text: [{ type: "required", message: "Поле не должно быть пустым" }],
  password: [
    { type: "required", message: "Пароль обязателен" },
    {
      type: "minLength",
      params: 6,
      message: "Пароль должен быть не менее 6 символов",
    },
  ],
  confirmPassword: [
    { type: "required", message: "Подтвердите пароль" },
    { type: "equals", params: "password", message: "Пароли не совпадают" },
  ],
};
