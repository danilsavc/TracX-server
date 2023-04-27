import models from "../models/models.js";
import ApiError from "../error/apiError.js";

const Category = models.Category;

class CategoryController {
  async create(req, res) {
    const { name } = req.body;
    const category = await Category.create({ name });
    return res.json(category);
  }

  async getAll(req, res) {
    const categories = await Category.findAll();
    return res.json(categories);
  }
}

export default new CategoryController();
