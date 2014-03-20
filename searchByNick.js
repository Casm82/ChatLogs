function searchByNick(connection, res, body, lang)
{
	var logSQL= "SELECT room.name, muc.sender,muc.nickname,muc.logTime,muc.body " +
				"FROM openfire.ofmucconversationlog muc, " +
				"openfire.ofmucroom room " +
				"WHERE muc.nickname like ? " +
				"AND muc.roomID = room.roomID " + 
				"ORDER BY muc.logTime ASC;";

	connection.query(logSQL, [body.nick], function(err, rows, fields)
		{
			if (err) throw err;

			if (lang == "ru") {
				var title = "Сообщения пользователя с ником " + body.nick +" сервера Openfire";
			} else {
				var title = "Messages user " + body.nick;
			};

			res.render(lang + '/printUser',
			  {	title:	title,
				reqID:	body,
			    messages: rows
			  });
		});
}	// <-- getLog

module.exports = searchByNick;
