import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";

interface UserType {
  id?: number;
  name?: string;
  password?: string;
}
class User extends Model {
  public id?: number;
  public email?: string;
  public userName?: string;
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, timestamps: false, modelName: "user" }
);
export { User };
