import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../error/apiError.js";
import models from "../models/models.js";
import emailValid from "../validations/emailValid.js";

const User = models.User || "";
const Roles = models.Roles || "";
const UserRole = models.UserRole || "";

const generateJwt = (id, name, surname, email, roleName) => {
  return jwt.sign({ id, name, surname, email, roleName }, process.env.SECRETKEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    try {
      const { name, surname, email, password } = req.body;
      let roles_id = req.body.roles_id;

      if (!roles_id) {
        roles_id = 2;
      }

      const valid = emailValid(email);

      if (!valid) {
        return next(ApiError.badRequest("Такої пошти не існує"));
      }

      const candidate = await User.findOne({ where: { email } });

      if (candidate) {
        return next(ApiError.badRequest("Користувач з таким email вже існує"));
      }

      const hashPassword = await bcrypt.hash(password, 5);

      const user = await User.create({ name, surname, email, password: hashPassword });

      const roles = await Roles.findOne({ where: { id: roles_id } });
      await UserRole.create({ userId: user.id, roleId: roles.id });

      const token = generateJwt(user.id, user.name, user.surname, user.email, roles.name);

      return res.json({ token });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return next(ApiError.internal("Неправильна пошта або пароль"));
      }

      let comparePassword = bcrypt.compareSync(password, user.password);

      if (!comparePassword) {
        return next(ApiError.internal("Неправильна пошта або пароль"));
      }

      const userRole = await UserRole.findAll({ where: { userId: user.id } });
      const idRoles = userRole.map((item) => item.roleId);
      const roles = await Roles.findAll({ where: { id: idRoles } });
      const rolesName = roles.map((item) => item.name);

      const token = generateJwt(user.id, user.name, user.surname, user.email, rolesName);
      return res.json({ token });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async check(req, res, next) {
    try {
      const userRole = await UserRole.findAll({ where: { userId: req.user.id } });
      const idRoles = userRole.map((item) => item.roleId);
      const roles = await Roles.findAll({ where: { id: idRoles } });
      const rolesName = roles.map((item) => item.name);

      const token = generateJwt(
        req.user.id,
        req.user.name,
        req.user.surname,
        req.user.email,
        rolesName
      );

      return res.json({ token });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getUserByEmail(req, res, next) {
    try {
      const { email } = req.body;

      if (!email) {
        return next(ApiError.badRequest("Треба вказати email користувача"));
      }

      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        return next(ApiError.badRequest("Користувач з таким email не знайдений"));
      }

      const userRole = await UserRole.findAll({ where: { userId: user.id } });
      const idRoles = userRole.map((item) => item.roleId);
      const roles = await Roles.findAll({ where: { id: idRoles } });
      const rolesName = roles.map((item) => item.name);

      const token = generateJwt(user.id, user.name, user.surname, user.email, rolesName);
      res.json({ token });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

export default new UserController();
