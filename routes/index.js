var getChatRooms = require("../getChatRooms"),
    getLog = require("../getLog"),
	mysql = require("mysql");

module.exports = function(app) {
	var connection = mysql.createConnection({
		host:		"172.10.1.16",
		database:	"openfire",
		user:		"chatlog",
		password:	"[bcnjhbCvjnh"
		});

	connection.connect();

	app.get('/', function(req, res) {
		getChatRooms(connection, res);
	});

	app.post('/getLog', function(req, res) {
		getLog(connection, res, req.body);
	});

};		// <--- app()
//			res.render('msg', {msg: "Статистика по будущему отсутствует"});
