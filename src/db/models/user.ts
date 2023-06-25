import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Book } from "./book";
import { RentedBook } from "./rented-books";

@Table({
  timestamps: false,
  tableName: "users",
})
class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public user_name!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public password!: string;
  @BelongsToMany(() => Book, () => RentedBook)
  books!: Book[];
}
//
// User.init(
//   {
//     id: {
//       type: DataType.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false,
//     },
//     email: {
//       type: DataType.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     user_name: {
//       type: DataType.STRING,
//       allowNull: false,
//     },
//     password: {
//       type: DataType.STRING,
//       allowNull: false,
//     },
//   },
//   { sequelize, timestamps: false, modelName: "user" }
// );
export { User };
