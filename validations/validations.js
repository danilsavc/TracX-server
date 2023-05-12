import { body } from "express-validator";

class Validations {
  eventValidation = [
    body("title")
      .notEmpty()
      .withMessage("Заголовок є обов'язковим для заповнення")
      .isLength({
        min: 2,
        max: 25,
      })
      .withMessage("Заголовок повинен містити мінімум 2 символи, а максимально 25 символів"),
    body("descriptions")
      .notEmpty()
      .withMessage("Опис є обов'язковим для заповнення")
      .isLength({ min: 3 })
      .withMessage("Опис повинен містити мінімум 3 символи"),
    body("data")
      .notEmpty()
      .withMessage("Дата є обов'язковою для заповнення")
      .matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/)
      .withMessage("Дата повинна бути у форматі YYYY-MM-DD HH:mm"),
    body("price")
      .notEmpty()
      .withMessage("Ціна є обов'язковою для заповнення")
      .isInt({ max: 9999 })
      .withMessage("Ціна повинна бути числом від 0 та до 9999"),
    body("tags")
      .optional({ nullable: true }) // Дозволяє поле бути або null, або пустим масивом
      .isArray()
      .withMessage("Теги повинні бути в масиві")
      .custom((value) => {
        // Перевірка, що кожен тег має мінімум 2 символи, якщо вони присутні
        if (value.length > 0) {
          return value.every((tag) => tag.length >= 2);
        }
        return true; // Пропускає перевірку, якщо теги відсутні
      })
      .withMessage("Теги повинні містити мінімум 2 символи"),
  ];

  categoryValidation = [
    body("name")
      .notEmpty()
      .withMessage("Назва категорії є обов'язковою для заповнення")
      .isLength({
        min: 2,
        max: 10,
      })
      .withMessage("Категорія повиненна містити мінімум 2 символи, а максимально 10 символів"),
  ];

  rolesValidation = [
    body("name")
      .notEmpty()
      .withMessage("Назва ролі є обов'язковою для заповнення")
      .isLength({
        min: 2,
        max: 10,
      })
      .withMessage("Роль повиненна містити мінімум 3 символи, а максимально 10 символів"),
  ];

  formatValidation = [
    body("name")
      .notEmpty()
      .withMessage("Назва формата є обов'язковою для заповнення")
      .isLength({
        min: 2,
        max: 10,
      })
      .withMessage("Формат повиненна містити мінімум 3 символи, а максимально 10 символів"),
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
