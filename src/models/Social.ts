import { DataTypes } from "sequelize";
import db from "../configs/db";
import OwnerInfoModel from "./OwnerInfo";

const Social = db.define("Social", {
  id: {
    type: DataTypes.NUMBER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  platform: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Social.belongsTo(OwnerInfoModel);

export default Social;
