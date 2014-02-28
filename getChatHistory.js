var mysql = require("mysql");

function getChatRooms(){
	var rooms = sqlQuery("SELECT roomID,name FROM openfire.ofmucroom;");
	connection.query(rooms, function(err, rows, fields)
		{
			if (err) thow err;

		});

}		// <--- getChatHistory

module.exports = getChatHistory;
