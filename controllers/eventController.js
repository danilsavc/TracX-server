import models from "../models/models.js";
import ApiError from "../error/apiError.js";

const Event = models.Event || "";
const EventInfo = models.EventInfo || "";

class EventController {
  async create(req, res, next) {
    try {
      const user_id = req.user.id;
      let { title, descriptions, data, price, tags, categoryId, bcgColor, formatId, info } =
        req.body;

      const event = await Event.create({
        title,
        descriptions,
        data,
        price,
        tags,
        categoryId,
        formatId,
        bcgColor,
        userId: user_id,
      });

      if (info) {
        const eventInfos = await Promise.all(
          info.map((i) =>
            EventInfo.create({
              title: i.title,
              descriptions: i.descriptions,
              eventId: event.id,
            })
          )
        );

        event.dataValues.info = eventInfos; // Додайте масив eventInfos до event для повернення у відповіді
      }

      return res.json(event);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res) {
    try {
      let { categoryId, formatId, limit, page, search } = req.query;
      page = page || 1;
      limit = limit || 6;
      let offset = page * limit - limit;
      let totalItems = 0;
      let totalPages = 0;
      let events;

      if (search) {
        const events = await Event.findAndCountAll();
        const filterEvents = events.rows.filter((obj) => {
          return obj.title.toLowerCase().includes(search.toLowerCase());
        });

        return res.json({
          events: {
            count: filterEvents.length,
            rows: filterEvents.map((event) => ({
              id: event.id,
              title: event.title,
              descriptions: event.descriptions,
              tags: event.tags,
              data: event.data,
              price: event.price,
              bcgColor: event.bcgColor,
              createdAt: event.createdAt,
              updatedAt: event.updatedAt,
              userId: event.userId,
              categoryId: event.categoryId,
              formatId: event.formatId,
            })),
          },
          totalPages: Math.ceil(filterEvents.length / limit),
        });
      }

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

      totalItems = events.count;
      totalPages = Math.ceil(totalItems / limit);

      return res.json({ events, totalPages });
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

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const user_id = req.user.id;
      const { title, descriptions, data, price, tags, categoryId, formatId, bcgColor, info } =
        req.body;
      const event = await Event.findOne({ where: { id } });

      if (!event) {
        return next(ApiError.badRequest("Івента з таким id не було знайдено"));
      }

      if (event.userId !== user_id) {
        return next(ApiError.internal("Немає доступа"));
      }

      event.title = title;
      event.descriptions = descriptions;
      event.data = data;
      event.price = price;
      event.tags = tags;
      event.bcgColor = bcgColor;
      event.categoryId = categoryId;
      event.formatId = formatId;

      await event.save();

      if (info) {
        // Видалити попередні записи EventInfo пов'язані з івентом
        await EventInfo.destroy({ where: { eventId: event.id } });

        // Створити нові записи EventInfo на основі наданого info
        const eventInfos = await Promise.all(
          info.map((i) =>
            EventInfo.create({
              title: i.title,
              descriptions: i.descriptions,
              eventId: event.id,
            })
          )
        );

        event.dataValues.info = eventInfos; // Додати масив eventInfos до event для повернення у відповіді
      }

      res.json(event);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const user_id = req.user.id;

      const event = await Event.findOne({ where: { id } });

      const eventInfo = await EventInfo.findAll({ where: { eventId: id } });

      if (!event) {
        return next(ApiError.badRequest("Івента з таким id не було знайдено"));
      }

      if (!eventInfo) {
        return next(ApiError.badRequest("Інформації про івент з таким id не було знайдено"));
      }

      if (event.userId !== user_id) {
        return next(ApiError.internal("Немає доступа"));
      }

      await Event.destroy({ where: { id } });
      await EventInfo.destroy({ where: { eventId: id } });

      return res.json({ message: "Івент було успішно видалено" });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getOneEventInfo(req, res, next) {
    try {
      const { id } = req.params;
      const eventInfo = await EventInfo.findAll({ where: { eventId: id } });

      if (eventInfo.length === 0) {
        return next(ApiError.badRequest("Інформація про цей івент не була знайдена"));
      }

      res.json(eventInfo);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

export default new EventController();
