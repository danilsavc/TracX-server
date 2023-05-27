import models from "../models/models.js";
import ApiError from "../error/apiError.js";

const Format = models.Format || "";

class FormatController {
  async create(req, res, next) {
    let { name } = req.body;
    name = name.toLowerCase();
    const candidate = await Format.findOne({ where: { name } });

    if (candidate) {
      if (candidate) {
        return next(ApiError.badRequest("Такий формат вже існує"));
      }
    }

    await Format.create({ name });
    return res.json({ message: "Формат успішно додано" });
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const format = await Format.findOne({ where: { id } });

      if (!format) {
        return next(ApiError.badRequest("Формата з таким id не було знайдено"));
      }

      return res.json(format);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res) {
    const formats = await Format.findAll();
    return res.json(formats);
  }
}

export default new FormatController();
