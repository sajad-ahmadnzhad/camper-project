import { DataTypes } from "sequelize";
import db from "../configs/db";

const Admin = db.define(
  "Admin",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, version: false }
);

export default Admin;
