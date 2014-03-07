var getChatRooms = require("../getChatRooms"),
    getLog = require("../getLog"),
    searchByNick = require("../searchByNick"),
    searchByJid = require("../searchByJid"),
	mysql = require("mysql");

module.exports = function(app) {
	var connection = mysql.createConnection({
		host:		"127.0.0.1",
		database:	"openfire",
		user:		"chatlog",
		password:	"password"
		});

	connection.connect();

	app.get('/', function(req, res) {
		getChatRooms(connection, res);
	});

	app.post('/getLog', function(req, res) {
		getLog(connection, res, req.body);
	});

	app.get('/searchByNick', function(req, res) {
		searchByNick(connection, res, req.query);
	});

	app.get('/searchByJid', function(req, res) {
		searchByJid(connection, res, req.query);
	});

};		// <--- app()
