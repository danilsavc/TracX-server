import models from "../models/models.js";
import ApiError from "../error/apiError.js";

const Roles = models.Roles || "";
const User = models.User || "";
const UserRole = models.UserRole || "";

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

  async userRole(req, res, next) {
    try {
      const { email, roleId } = req.body;

      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        return next(ApiError.badRequest("Користувач не знайден"));
      }

      const roles = await Roles.findOne({ where: { id: roleId } });

      if (!roles) {
        return next(ApiError.badRequest("Роль не знайдена"));
      }

      const userRole = await UserRole.findOne({ where: { userId: user.id, roleId: roles.id } });
      if (userRole) {
        return next(ApiError.internal("У користувача вже є ця роль"));
      }

      await UserRole.create({ userId: user.id, roleId: roles.id });

      res.json({ message: "Роль успішно надано користувачу" });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

export default new RolesController();
