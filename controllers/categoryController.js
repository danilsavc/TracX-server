import models from "../models/models.js";
import ApiError from "../error/apiError.js";

const Category = models.Category || "";

class CategoryController {
  async create(req, res, next) {
    try {
      let { name } = req.body;
      name = name.toLowerCase();
      const candidate = await Category.findOne({ where: { name } });

      if (candidate) {
        if (candidate) {
          return next(ApiError.badRequest("Така категорія вже існує"));
        }
      }

      await Category.create({ name });
      return res.json({ message: "Категорію успішно додано" });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res) {
    const categories = await Category.findAll();
    return res.json(categories);
  }
}

export default new CategoryController();
