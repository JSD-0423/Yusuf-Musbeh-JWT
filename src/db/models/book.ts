import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user";
import { RentedBook } from "./rented-books";

@Table({ timestamps: false, modelName: "books" })
class Book extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id!: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author!: string;
  @BelongsToMany(() => User, () => RentedBook)
  users!: User[];
}

export { Book };
