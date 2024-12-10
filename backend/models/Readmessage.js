const { Sequelize, DataTypes } = require("sequelize");
const { User } = require("./User");
const { Message } = require("./Message");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

class MessageReceipt extends Model {}

MessageReceipt.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    message_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Message,
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    read_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "MessageReceipt",
    tableName: "message_receipts",
    timestamps: false,
  }
);

module.exports = MessageReceipt;
