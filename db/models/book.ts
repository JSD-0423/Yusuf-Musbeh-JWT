import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";
class Book extends Model {
  public id?: number;
  public name?: string;
  public author?: string;
}

Book.init(
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
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, timestamps: false, modelName: "book" }
);
export { Book };
