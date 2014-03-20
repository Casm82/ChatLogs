function searchByJid(connection, res, body, lang)
{
	var logSQL= "SELECT room.name, muc.sender,muc.nickname,muc.logTime,muc.body " +
				"FROM openfire.ofmucconversationlog muc, " +
				"openfire.ofmucroom room " +
				"WHERE muc.sender like ? " +
				"AND muc.roomID = room.roomID " + 
				"ORDER BY muc.logTime ASC;";

	connection.query(logSQL, [body.jid + "%"], function(err, rows, fields)
		{
			if (err) throw err;

			if (lang == "ru") {
				var title = "Сообщения пользователя с jid " + body.jid +" сервера Openfire";
			} else {
				var title = "Messages user " + body.jid;
			};
			
			res.render(lang + '/printUser',
			  {	title: title,
				reqID: body,
			    messages: rows
			  });
		});
}	// <-- getLog

module.exports = searchByJid;
