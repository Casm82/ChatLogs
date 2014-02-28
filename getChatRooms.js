var express = require('express'),
//	mysql = require("mysql"),
	app = express();

var timeNow = new Date(),
	dayNow = timeNow.getDate(),
	monthNow = timeNow.getMonth(),
	yearNow = timeNow.getFullYear(),
	hourNow = timeNow.getHours(),
	minNow = timeNow.getMinutes();

// Функция генерирует массив дней, чисел, часов, минут 
function timeRange(type, initVal)
{
	var skelArray = [initVal];
	
	switch (type)
		{
			case "days" :	var startVal = 1; var endVal = 31; break;
			case "months" :	var startVal = 1; var endVal = 12; break;
			case "hours" :	var startVal = 0; var endVal = 23; break;
			case "mins" :	var startVal = 0; var endVal = 59; break;
		};

	for (var i=startVal; i<=endVal; i++) { skelArray.push(i)}
	return skelArray;
};

// Функция генерирует массив годов  [2014,2013,2012]
// с текущего года по 2012 год
function yearRange(initYear)
{
	var skelArray = [];
	for (var i=initYear; i>=2012; i--) { skelArray.push(i)}
	return skelArray;
};

// Дата и время начала поиска
var sdaysArray   = timeRange("days", dayNow),
	smonthsArray = timeRange("months", monthNow + 1),
	syearsArray  = yearRange(yearNow),
	shoursArray  = timeRange("hours", 0),
	sminsArray   = timeRange("mins", 0);

// Дата и время конца поиска
var edaysArray   = timeRange("days", dayNow),
	emonthsArray = timeRange("months", monthNow + 1),
	eyearsArray  = yearRange(yearNow),
	ehoursArray  = timeRange("hours", hourNow),
	eminsArray   = timeRange("mins", minNow);

// Функция ищет комнаты в БД Openfire
// и отображает страницу с параметрами поиска
function getChatRooms(connection, res){
	var roomsSQL = "SELECT roomID,name FROM openfire.ofmucroom;";
	connection.query(roomsSQL, function(err, rows, fields)
		{
			if (err) throw err;
			res.render('index',
			  {	title: "Просмотр журналов конференций сервера Openfire",
			    rooms:		rows,

				sdays:		sdaysArray,
				smonths:	smonthsArray,
				syears:		syearsArray,
				shours:		shoursArray,
				smins:		sminsArray,

				edays:		edaysArray,
				emonths:	emonthsArray,
				eyears:		eyearsArray,
				ehours:		ehoursArray,
				emins:		eminsArray
			  });
		});

}		// <--- getChatHistory

module.exports = getChatRooms;
