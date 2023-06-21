import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";
class RentedBook extends Model {
  public bookId?: number;
  public userId?: number;
}

RentedBook.init(
  {
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, timestamps: false, modelName: "rented_Book" }
);
export { RentedBook };
