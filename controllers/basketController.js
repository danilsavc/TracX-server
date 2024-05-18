import nodemailer from "nodemailer";
import models from "../models/models.js";
import ApiError from "../error/apiError.js";
import { sendEmail } from "../sendEmail.js";
import { createPdf, removePdf } from "../pdf.js";

const Basket_Event = models.BasketEvent || "";
const Event = models.Event || "";

class BasketController {
  async create(req, res, next) {
    const user = req.user.id;
    const { name, surname, email } = req.user;
    const { eventId } = req.body;

    const fullname = name + " " + surname;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    if (!eventId) {
      return next(ApiError.badRequest("Id івента не вказаний"));
    }

    try {
      const event = await Event.findOne({ where: { id: eventId } });

      if (!event) {
        return next(ApiError.badRequest("Id такого івента не існує"));
      }

      const basketEvent = await Basket_Event.findOne({
        where: { userId: user, eventId: event.id },
      });

      if (basketEvent) {
        return next(ApiError.badRequest("Цей івент вже додано до календаря"));
      }

      await Basket_Event.create({ userId: user, eventId: event.id });
      await createPdf(fullname, event.data, event.price, event.title);
      await transporter.sendMail(sendEmail(email, fullname, event));
      await removePdf();

      return res.json({ message: "Івент успішно додано до календаря" });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const user = req.user.id;
      const basketEvent = await Basket_Event.findAll({ where: { userId: user } });

      return res.json(basketEvent);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getBasketEvents(req, res, next) {
    try {
      const { events_id } = req.body;

      if (!events_id) {
        return next(ApiError.badRequest("Треба вказати id подій"));
      }

      const events = await Event.findAll({ where: { id: events_id } });

      if (!events || events.length === 0) {
        return next(ApiError.badRequest("Подій з такими id не знайдено"));
      }

      return res.json(events);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user.id;

      const basketEvent = await Basket_Event.findOne({ where: { userId: user, eventId: id } });

      if (!basketEvent) {
        return next(ApiError.badRequest("Такого івента в календарі немає"));
      }

      await Basket_Event.destroy({ where: { userId: user, eventId: id } });
      return res.json({ message: "Івент успішно видалено" });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

export default new BasketController();
