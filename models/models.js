import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  surname: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketEvent = sequelize.define("basket_event", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Event = sequelize.define("event", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  subtitle: { type: DataTypes.STRING, allowNull: false },
  format: { type: DataTypes.BOOLEAN, allowNull: false },
  data: { type: DataTypes.DATE, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
});

const Category = sequelize.define("category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const EventInfo = sequelize.define("event_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  descriptions: { type: DataTypes.STRING, allowNull: false },
});

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(BasketEvent);
BasketEvent.belongsTo(Basket);

Category.hasMany(Event);
Event.belongsTo(Category);

Event.hasMany(BasketEvent);
BasketEvent.belongsTo(Event);

Event.hasMany(EventInfo, { as: "info" });
EventInfo.belongsTo(Event);

export default {
  User,
  Basket,
  BasketEvent,
  Category,
  Event,
  EventInfo,
};
