function getLog(connection, res, body, lang)
{
	var start = {hour: body.shour, min: body.smin,
				 day: body.sday, month: body.smonth-1, year: body.syear};

	var end =   {hour: body.ehour, min: body.emin,
				 day: body.eday, month: body.emonth-1, year: body.eyear};

	var unixTimeStart =	new Date(start.year, start.month, start.day, start.hour, start.min).getTime();
	var unixTimeEnd   = new Date(  end.year,   end.month,   end.day,   end.hour,   end.min).getTime();

	var logSQL= "SELECT * FROM openfire.ofmucconversationlog WHERE roomID =" +
				" (SELECT roomID FROM openfire.ofmucroom WHERE name='" + body.room + "')" +
				" AND logTime > " + unixTimeStart +
				" AND logTime < " + unixTimeEnd +
				" ORDER BY logTime ASC;";
	connection.query(logSQL, function(err, rows, fields)
		{
			if (err) throw err;

			if (lang == "ru") {
				var title = "Журнал конференции " + body.room +" сервера Openfire";
			} else {
				var title = "Group Chat Room " + body.room + " log";
			};

			res.render(lang + '/printConf',
			  {	title: title,
				reqID: body,
			    messages: rows
			  });
		});
}	// <-- getLog

module.exports = getLog;
