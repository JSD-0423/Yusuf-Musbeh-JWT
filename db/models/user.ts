import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";

class User extends Model {
  public id?: number;
  public name?: string;
  public password?: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, timestamps: false, modelName: "user" }
);
export { User };
