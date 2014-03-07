var getChatRooms = require("../getChatRooms"),
    getLog = require("../getLog"),
    searchByNick = require("../searchByNick"),
    searchByJid = require("../searchByJid");

module.exports = function(connection, app) {

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
