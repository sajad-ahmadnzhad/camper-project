import { Sequelize } from "sequelize";

const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3307;
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  dialect: "mysql",
  logging: false,
  port,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connection was successfully");
    return sequelize.sync({ alter: true });
  })
  .catch((err) => console.log(`DB Connection has error: ${err}`));

export default sequelize;
