import models from "../models/models.js";
import ApiError from "../error/apiError.js";

const Event = models.Event || "";
const EventInfo = models.EventInfo || "";

class EventController {
  async create(req, res, next) {
    try {
      let { title, descriptions, data, price, categoryId, formatId, info } = req.body;

      const event = await Event.create({ title, descriptions, data, price, categoryId, formatId });

      if (info) {
        await info.forEach((i) => {
          EventInfo.create({
            title: i.title,
            descriptions: i.descriptions,
            eventId: event.id,
          });
        });
      }

      return res.json(event);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res) {
    try {
      let { categoryId, formatId, limit, page } = req.query;
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;

      let events;

      if (!categoryId && !formatId) {
        events = await Event.findAndCountAll({ limit, offset });
      }

      if (categoryId && !formatId) {
        events = await Event.findAndCountAll({ where: { categoryId }, limit, offset });
      }

      if (!categoryId && formatId) {
        events = await Event.findAndCountAll({ where: { formatId }, limit, offset });
      }

      if (categoryId && formatId) {
        events = await Event.findAndCountAll({ where: { categoryId, formatId }, limit, offset });
      }

      return res.json(events);
    } catch (error) {
      res.json(ApiError.badRequest(error.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const event = await Event.findOne({
        where: { id },
        include: [{ model: EventInfo, as: "info" }],
      });

      if (!event) {
        return next(ApiError.badRequest("Івента з таким id не було знайдено"));
      }

      return res.json(event);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const event = await Event.destroy({ where: { id } });

      if (!event) {
        return next(ApiError.badRequest("Івента з таким id не було знайдено"));
      }

      return res.json({ message: "Івент було успішно видалено" });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

export default new EventController();
