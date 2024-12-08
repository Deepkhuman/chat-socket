const mysql = require("mysql2");

require("dotenv").config();

async function ConnectDb() {
	const connection = mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: "",
		database: process.env.DB_DATABASE,
	});

	connection.connect((err) => {
		if (err) {
			console.log("Error While Connecting to Database :", err.stack);
			return;
		}
		console.log("Connected to the Database", connection.threadId);
	});
}

module.exports = {
	ConnectDb,
};
