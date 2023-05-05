import models from "../models/models.js";
import ApiError from "../error/apiError.js";

const Format = models.Format || "";

class FormatController {
  async create(req, res, next) {
    const { name } = req.body;
    const candidate = await Format.findOne({ where: { name } });

    if (candidate) {
      if (candidate) {
        return next(ApiError.badRequest("Такий формат вже існує"));
      }
    }

    const format = await Format.create({ name });
    return res.json(format);
  }

  async getAll(req, res) {
    const formats = await Format.findAll();
    return res.json(formats);
  }
}

export default new FormatController();
