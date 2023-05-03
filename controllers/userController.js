import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../error/apiError.js";
import models from "../models/models.js";
import emailValid from "../validations/emailValid.js";

const User = models.User || "";
const Basket = models.Basket || "";

const generateJwt = (id, name, surname, email, role) => {
  return jwt.sign({ id, name, surname, email, role }, process.env.SECRETKEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    try {
      const { name, surname, email, password, role } = req.body;
      const valid = emailValid(email);

      if (!valid) {
        return next(ApiError.badRequest("Такої пошти не існує"));
      }

      const candidate = await User.findOne({ where: { email } });

      if (candidate) {
        return next(ApiError.badRequest("Користувач з таким email вже існує"));
      }

      const hashPassword = await bcrypt.hash(password, 5);

      const user = await User.create({ name, surname, email, password: hashPassword, role });
      const basket = await Basket.create({ userId: user.id });

      const token = generateJwt(user.id, user.name, user.surname, user.email, user.role);

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

      const token = generateJwt(user.id, user.name, user.surname, user.email, user.role);
      return res.json({ token });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async check(req, res, next) {
    try {
      const token = generateJwt(user.id, user.name, user.surname, user.email, user.role);

      return res.json({ token });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

export default new UserController();
