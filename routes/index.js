var getChatRooms = require("../getChatRooms"),
    getLog = require("../getLog"),
    searchByNick = require("../searchByNick"),
    searchByJid = require("../searchByJid");

function detectLang(req){
	var lang = req.headers["accept-language"].slice(0,2);
	if ( lang == "ru" ) { return "ru" } else { return "en" };
};

module.exports = function(connection, app) {

	app.get('/', function(req, res) {
	console.log("Connected client: %s", req.ip);
		getChatRooms(connection, res, detectLang(req));
	});

	app.post('/getLog', function(req, res) {
		getLog(connection, res, req.body, detectLang(req));
	});

	app.get('/searchByNick', function(req, res) {
		searchByNick(connection, res, req.query, detectLang(req));
	});

	app.get('/searchByJid', function(req, res) {
		searchByJid(connection, res, req.query, detectLang(req));
	});

};		// <--- app()
