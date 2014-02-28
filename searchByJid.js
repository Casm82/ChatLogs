function searchByJid(connection, res, body)
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
			res.render('printUser',
			  {	title: "Сообщения пользователя с ником " + body.nick +" сервера Openfire",
				reqID: body,
			    messages: rows
			  });
		});
}	// <-- getLog

module.exports = searchByJid;
