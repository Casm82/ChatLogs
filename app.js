var express = require('express'),
	expressMiddlewares = require('express-middlewares'),
	methodOverride= require('method-override'),
	http = require('http'),
	path = require('path'),
	routes = require('./routes'),
	app = express(),
	mysql = require("mysql");

// переменные окружения
app.set('port', process.env.PORT || 3010);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('x-powered-by', false);
app.use(expressMiddlewares.favicon());
app.use(expressMiddlewares.bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'static')));

var db_config = {
	host:		"db.mysql.local",
	database:	"openfire",
	user:		"chatlog",
	password:	"password"
	};

var connection;

function handleDisconnect(){
	connection = mysql.createConnection(db_config);

	connection.connect(function(err){
		if (err) {
			console.log("Error when connecting mysql:", err);
			setTimout(handleDisconnect, 2000);
		}
		routes(connection, app);
	});
	
	connection.on('error', function(err){
		console.log("db error", err);
		if(err.code === "PROTOCOL_CONNECTION_LOST") {
			handleDisconnect();
		} else {
			throw err;
		};
	});

};	//<--- handleDisconnect()

handleDisconnect();


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on http://localhost:' + app.get('port'));
});

