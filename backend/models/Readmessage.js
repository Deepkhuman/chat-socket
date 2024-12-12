const { Sequelize, DataTypes } = require("sequelize");
const { Message } = require("./Message");
const { User } = require("./User");

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

const ReadReceipt = sequelize.define(
  "ReadReceipt",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    messageId: {
      type: DataTypes.INTEGER,
      references: {
        model: Message,
        key: "id",
      },
      allowNull: false,
    },
    senderId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "read_receipts",
  }
);

// Relationships
ReadReceipt.belongsTo(Message, { foreignKey: "messageId" });
Message.hasMany(ReadReceipt, { foreignKey: "messageId" });

ReadReceipt.belongsTo(User, { foreignKey: "userId" });
User.hasMany(ReadReceipt, { foreignKey: "userId" });

ReadReceipt.belongsTo(User, { foreignKey: "senderId" });
User.hasMany(ReadReceipt, { foreignKey: "senderId" });

sequelize
  .sync({ force: false })
  .then(() => console.log("ReadMessages table created or verified"))
  .catch((err) => console.error("Error syncing models:", err));

module.exports = { ReadReceipt };
