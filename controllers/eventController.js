import models from "../models/models.js";
import ApiError from "../error/apiError.js";
import * as tf from "@tensorflow/tfjs";
import fs from "fs";

const results = [];
const Event = models.Event || "";
const EventInfo = models.EventInfo || "";
const Format = models.Format || "";
const Category = models.Category || "";

const encodeItem = (item) => {
  // Производим кодирование в соответствии с условиями
  if (item === "React") {
    return 1;
  } else if (item === "Python") {
    return 2;
  } else if (item === "Java") {
    return 3;
  } else if (item === "Java Script") {
    return 4;
  } else {
    return 5;
  }
};

const preferencesEncoded = (items) => {
  return items.map((item) => {
    if (item === "React") {
      return 1;
    } else if (item === "Python") {
      return 2;
    } else if (item === "Java") {
      return 3;
    } else if (item === "Java Script") {
      return 4;
    } else {
      return 5;
    }
  });
};

function encodeRecommendations(recommendations) {
  return recommendations.map((recommendation, index) => {
    const [eventId, eventName, eventType, eventDateTime, rating] = recommendation;
    return [
      parseInt(eventId),
      index,
      encodeItem(eventType),
      new Date(eventDateTime).getTime(),
      parseInt(rating),
    ];
  });
}

class EventController {
  // model;
  // mean;
  // stdDev;

  // normalizeData(data) {
  //   return data.sub(this.mean).div(this.stdDev);
  // }

  // constructor() {
  //   this.normalizeData = this.normalizeData.bind(this);
  //   this.model = tf.sequential();
  //   this.model.add(tf.layers.dense({ units: 5, inputShape: [2] }));
  //   this.model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

  //   var dataset = JSON.parse(fs.readFileSync("data.json", "utf8"));

  //   const clients = dataset.map((item) => [
  //     parseFloat(item.ClientID),
  //     preferencesEncoded(item.Preferences),
  //   ]);

  //   const events = dataset.map((item, index) => [
  //     encodeRecommendations(item.Recommendations),
  //     // parseFloat(item.EventID),
  //     // index,
  //     // encodeItem(item.EventType),
  //     // new Date(item.EventDateTime).getTime(),
  //     // parseFloat(item.Rating),
  //   ]);
  //   const xs = tf.tensor2d(clients, [dataset.length, 2]);

  //   const { mean, variance } = tf.moments(xs, 0);
  //   this.mean = mean;
  //   this.stdDev = tf.sqrt(variance);
  //   const normalizedXs = this.normalizeData(xs);

  //   const ys = tf.tensor3d(events, [dataset.length, 5]);

  //   console.log("Start Model training!");
  //   this.model.fit(normalizedXs, ys, { epochs: 100 }).then(() => {
  //     console.log("Model trained!");
  //     // model.predict(tf.tensor2d([5, [1, 2]], [1, 2])).print();
  //   });

  //   this.getRecomandationEvent = this.getRecomandationEvent.bind(this);
  // }

  async create(req, res, next) {
    try {
      const user_id = req.user.id;
      let { title, descriptions, data, price, tags, categoryId, bcgColor, formatId, info } =
        req.body;

      const format = await Format.findOne({ where: { id: formatId } });
      const category = await Category.findOne({ where: { id: categoryId } });

      if (!format) {
        return next(ApiError.badRequest("Формат не знайдено"));
      }
      if (!category) {
        return next(ApiError.badRequest("Категорію не знайдено"));
      }

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
        events = await Event.findAndCountAll();
        const filterEvents = events.rows.filter((obj) => {
          return obj.title.toLowerCase().includes(search.toLowerCase());
        });

        events.rows = filterEvents;
        totalItems = filterEvents.length;
        totalPages = Math.ceil(totalItems / limit);

        events.rows = filterEvents.slice(offset, offset + limit);
        return res.json({ events, totalPages });
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

  async getAllByCreator(req, res) {
    try {
      let { limit, page } = req.query;
      const { userId } = req.body;
      page = page || 1;
      limit = limit || 6;
      let offset = page * limit - limit;
      let totalItems = 0;
      let totalPages = 0;
      const events = await Event.findAndCountAll({ where: { userId: userId }, limit, offset });

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

  async getRecomandationEvent(req, res, next) {
    try {
      // const { userId, preferences } = req.body;
      // const events = await Event.findAll();
      // const xs = tf.tensor2d([parseFloat(userId), preferencesEncoded(preferences)], [1, 2]);
      // const normalizedXs = this.normalizeData(xs);
      // const prediction = this.model.predict(normalizedXs).dataSync();
      // return res.json({
      //   EventId: Math.round(prediction[0]),
      //   EventName: Math.round(prediction[1]),
      //   EventType: Math.round(prediction[2]),
      //   EventDataTime: Math.round(prediction[3]),
      //   Rating: Math.round(prediction[4]),
      // });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

export default new EventController();
