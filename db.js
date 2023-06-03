import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // Name BD
  process.env.DB_USER, // User
  process.env.DB_PASSWORD, // Password
  {
    dialect: "postgres",
    host: process.env.DATABASE_URL || process.env.DB_HOST,
    port: process.env.DB_PORT,
    ssl: true, // Додайте цю опцію
    dialectOptions: {
      ssl: true, // Додайте цю опцію для Sequelize v6 та новіших версій
    },
  }
);

export default sequelize;
