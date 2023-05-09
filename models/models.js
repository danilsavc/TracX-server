import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  surname: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});

const Roles = sequelize.define("roles", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const UserRole = sequelize.define("user_role", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketEvent = sequelize.define("basket_event", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Event = sequelize.define("event", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  descriptions: { type: DataTypes.STRING, allowNull: false },
  tags: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  data: { type: DataTypes.DATE, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
});

const Category = sequelize.define("category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Format = sequelize.define("format", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const EventInfo = sequelize.define("event_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  descriptions: { type: DataTypes.STRING, allowNull: false },
});

User.hasOne(BasketEvent);
BasketEvent.belongsTo(User);

User.belongsToMany(Roles, { through: "user_role" });
Roles.belongsToMany(User, { through: "user_role" });

User.hasMany(Event);
Event.belongsTo(User);

Category.hasMany(Event);
Event.belongsTo(Category);

Format.hasMany(Event);
Event.belongsTo(Format);

Event.hasMany(BasketEvent);
BasketEvent.belongsTo(Event);

Event.hasMany(EventInfo, { as: "info" });
EventInfo.belongsTo(Event);

export default {
  User,
  Roles,
  Format,
  UserRole,
  BasketEvent,
  Category,
  Event,
  EventInfo,
};
