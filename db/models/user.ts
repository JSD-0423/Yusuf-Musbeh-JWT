import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";

class User extends Model {
  public id?: string;
  public name?: string;
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, timestamps: false, modelName: "user" }
);
export { User };
