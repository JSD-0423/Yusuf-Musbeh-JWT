import {
  Model,
  Table,
  ForeignKey,
  Column,
  DataType,
} from "sequelize-typescript";
import { Book } from "./book";
import { User } from "./user";

@Table({ timestamps: false, tableName: "rented_books" })
class RentedBook extends Model {
  @ForeignKey(() => Book)
  @Column({ type: DataType.INTEGER, allowNull: false })
  book_id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;
}

export { RentedBook };
