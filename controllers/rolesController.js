import models from "../models/models.js";
import ApiError from "../error/apiError.js";

const Roles = models.Roles || "";

class RolesController {
  async create(req, res, next) {
    const { name } = req.body;
    const candidate = await Roles.findOne({ where: { name } });

    if (candidate) {
      if (candidate) {
        return next(ApiError.badRequest("Така категорія вже існує"));
      }
    }

    const roles = await Roles.create({ name });
    return res.json(roles);
  }

  async getAll(req, res) {
    const roles = await Roles.findAll();
    return res.json(roles);
  }
}

export default new RolesController();
