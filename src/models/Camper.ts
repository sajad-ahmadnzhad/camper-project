import db from "../configs/db";
import { DataTypes } from "sequelize";

const Camper = db.define(
  "Camper",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: DataTypes.JSON,
    mainImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { timestamps: true, version: false }
);

export default Camper;
