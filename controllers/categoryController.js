import models from "../models/models.js";
import ApiError from "../error/apiError.js";

const Category = models.Category || "";

class CategoryController {
  async create(req, res, next) {
    const { name } = req.body;
    const candidate = await Category.findOne({ where: { name } });

    if (candidate) {
      if (candidate) {
        return next(ApiError.badRequest("Така категорія вже існує"));
      }
    }

    const category = await Category.create({ name });
    return res.json(category);
  }

  async getAll(req, res) {
    const categories = await Category.findAll();
    return res.json(categories);
  }
}

export default new CategoryController();
