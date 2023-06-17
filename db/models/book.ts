import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";
class Book extends Model {
  public id?: string;
  public name?: string;
  public author?: string;
}

Book.init(
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
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, timestamps: false, modelName: "book" }
);
export { Book };
