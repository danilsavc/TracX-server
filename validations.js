import { body } from "express-validator";

class Validations {
  eventValidation = [
    body(
      "title",
      "Заголовок повинен містити мінімум 3 символи, а максимально 25 символів"
    ).isLength({
      min: 3,
      max: 25,
    }),
    body("subtitle", "Підзаголовок повинен містити мінімум 3 символи").isLength({ min: 3 }),
    body(
      "format",
      "Формат повинен містити true або false, де true-онлайн і false-оффлайн"
    ).isBoolean(),
    body("data", "Дата повинна бути у такому форматі YYYY-MM-DD").isDate(),
    body("price", "Ціна повинна бути числом від 0 та до 9999").isInt({ max: 9999 }),
  ];

  categoryValidation = [
    body(
      "name",
      "Категорія повиненна містити мінімум 3 символи, а максимально 10 символів"
    ).isLength({
      min: 3,
      max: 10,
    }),
  ];
}

export default new Validations();
