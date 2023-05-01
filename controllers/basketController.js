import models from "../models/models.js";
import ApiError from "../error/apiError.js";

const Basket = models.Basket || "";
const Basket_Event = models.BasketEvent || "";
const Event = models.Event || "";

class BasketController {
  async create(req, res, next) {
    try {
      const user = req.user.id;
      const { eventId } = req.body;

      if (!eventId) {
        return next(ApiError.badRequest("Id івента не вказаний"));
      }

      const basket = await Basket.findOne({ where: { userId: user } });

      if (!basket) {
        return next(ApiError.badRequest("Кошик користувача ще не створенний"));
      }

      const event = await Event.findOne({ where: { id: eventId } });

      if (!event) {
        return next(ApiError.badRequest("Id такого івента не існує"));
      }

      const basketEvent = await Basket_Event.findOne({
        where: { basketId: basket.id, eventId: event.id },
      });

      if (basketEvent) {
        return next(ApiError.badRequest("Цей івент вже додано до кошика"));
      }

      await Basket_Event.create({ basketId: basket.id, eventId: event.id });

      return res.json({ message: "Івент успішно додано до кошика" });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const user = req.user.id;
      const basket = await Basket.findOne({ where: { userId: user } });

      if (!basket) {
        return next(ApiError.badRequest("Кошик користувача ще не створенний"));
      }

      const basketEvent = await Basket_Event.findAll({ where: { basketId: basket.id } });

      return res.json(basketEvent);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user.id;
      const basket = await Basket.findOne({ where: { userId: user } });

      if (!basket) {
        return next(ApiError.badRequest("Кошик користувача ще не створенний"));
      }

      const basketEvent = await Basket_Event.findOne({ where: { basketId: basket.id, id: id } });

      if (!basketEvent) {
        return next(ApiError.badRequest("Такого івента в кошику немає"));
      }

      await Basket_Event.destroy({ where: { basketId: basket.id, id: id } });
      return res.json({ message: "Івент успішно видалено" });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

export default new BasketController();
