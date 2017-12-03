var express = require('express');
var app = express();

quote_to_string = function() {
	return this['text'] + "\n --" + this['attribution'];
}

var qi = 0;

var quotes = require('./quote_db.json').map(
	function(q) { q.toString = quote_to_string; q.index = qi++; return q }
	);
	
app.get('/count', function(req, res) {
	res.json({ number: quotes.length });
	res.end();
});

app.get('/quote/:id', function(req, res) {
	var quote = quotes.find( function(elt) { 
		return elt.id == req.params['id'];
	});
	
	if (quote == undefined) {
		res.writeHead(404);
		res.end();
	} else {
		res.send(quote);
	}
});

app.get('/random', function(req, res) {
	var quote = quotes[Math.floor((Math.random() * quotes.length))];
	res.writeHead(302, { 'Location': '/quote/' + quote['id'] });
	res.end();
});

app.get('/all', function(req, res) {
	res.send(quotes);
});

<<<<<<< HEAD
app.listen((process.env.PORT == null) ? 9000 : process.env.PORT);
=======
app.listen((process.env.PORT == null) ? 8080 : process.env.PORT);
>>>>>>> 77615c50488fbd48edfde2b018f03cfb91480d6e
