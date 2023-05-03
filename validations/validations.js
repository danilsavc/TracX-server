import { body } from "express-validator";

class Validations {
  eventValidation = [
    body("title")
      .notEmpty()
      .withMessage("Заголовок є обов'язковим для заповнення")
      .isLength({
        min: 3,
        max: 25,
      })
      .withMessage("Заголовок повинен містити мінімум 3 символи, а максимально 25 символів"),
    body("subtitle")
      .notEmpty()
      .withMessage("Підзаголовок є обов'язковим для заповнення")
      .isLength({ min: 3 })
      .withMessage("Підзаголовок повинен містити мінімум 3 символи"),
    body("format", "Формат повинен містити лише true або false")
      .notEmpty()
      .withMessage("Формат є обов'язковим для заповнення")
      .isIn(["online", "offline"])
      .withMessage("Формат повинен містити лише online або offline"),
    body("data")
      .notEmpty()
      .withMessage("Дата є обов'язковою для заповнення")
      .isDate()
      .withMessage("Дата повинна бути у такому форматі YYYY-MM-DD"),
    body("price")
      .notEmpty()
      .withMessage("Ціна є обов'язковою для заповнення")
      .isInt({ max: 9999 })
      .withMessage("Ціна повинна бути числом від 0 та до 9999"),
  ];

  categoryValidation = [
    body("name")
      .notEmpty()
      .withMessage("Назва категорії є обов'язковою для заповнення")
      .isLength({
        min: 2,
        max: 10,
      })
      .withMessage("Категорія повиненна містити мінімум 3 символи, а максимально 10 символів"),
  ];

  registrationValidation = [
    body("name")
      .notEmpty()
      .withMessage("Ім'я є обов'язковим для заповнення")
      .isLength({ max: 15 })
      .withMessage("Ім'я повинно містити максимум 15 символів"),
    body("surname")
      .notEmpty()
      .withMessage("Прізвище є обов'язковим для заповнення")
      .isLength({ max: 20 })
      .withMessage("Прізвище повинно містити максимум 20 символів"),
    body("email")
      .notEmpty()
      .withMessage("Електронна пошта є обов'язковою для заповнення")
      .isEmail()
      .withMessage("Введіть коректну електронну пошту"),
    body("password")
      .notEmpty()
      .withMessage("Пароль є обов'язковим для заповнення")
      .isLength({ min: 6 })
      .withMessage("Пароль повинен містити мінімум 6 символів")
      .matches(/[A-Z]/)
      .withMessage("Пароль повинен містити хоча б одну велику літеру"),
  ];

  loginValidation = [
    body("email")
      .notEmpty()
      .withMessage("Електронна пошта є обов'язковою для заповнення")
      .isEmail()
      .withMessage("Введіть коректну електронну пошту"),
    body("password")
      .notEmpty()
      .withMessage("Пароль є обов'язковим для заповнення")
      .isLength({ min: 6 })
      .withMessage("Пароль повинен містити мінімум 6 символів")
      .matches(/[A-Z]/)
      .withMessage("Пароль повинен містити хоча б одну велику літеру"),
  ];
}

export default new Validations();