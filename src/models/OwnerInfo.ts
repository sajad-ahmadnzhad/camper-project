import { DataTypes } from "sequelize";
import db from "../configs/db";

const OwnerInfo = db.define(
  "OwnerInfo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT("medium"),
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    socialLinks: DataTypes.JSON,
    avatarURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mainCover: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, version: false }
);

export default OwnerInfo;
