const { Sequelize, DataTypes } = require("sequelize");
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

const Message = sequelize.define(
	"Message",
	{
		message: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		sender: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: "id",
			},
			allowNull: false,
		},
		receiver: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: "id",
			},
			allowNull: false,
		},
		sentAt: {
			type: DataTypes.DATE,
			defaultValue: Sequelize.NOW,
		},
	},
	{
		tableName: "messages",
	}
);

User.hasMany(Message, { foreignKey: "sender" });
Message.belongsTo(User, { foreignKey: "sender" });

User.hasMany(Message, { foreignKey: "receiver" });
Message.belongsTo(User, { foreignKey: "receiver" });

sequelize
	.sync({ force: false })
	.then(() => console.log("Message table created or verified"))
	.catch((err) => console.error("Error syncing models:", err));

module.exports = { Message };
