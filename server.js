var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pg = require('pg');

var config={
	user: 'postgres',
	database: 'postgres',
	host: 'localhost',
	password: 123
};

if (typeof Promise == 'undefined') {
  global.Promise = require('promise-polyfill')
}

var app = express();
app.use(morgan('combined'));

var articles={	
'article-one' :{
	title:'Article-one | Anurag',
	heading:'Article-one',
	date:'Sep 5,2016',
	content: 
	"<p>A strong memory depends on the health and vitality of your brain."+ 
	"Whether you are a "+
	"student studying for final exams, a working professional interested"+ 
	"in doing all you can to stay mentally sharp, or a senior looking to preserve and enhance"+ 
	"your grey matter as you age, there are lots of things "+
	"you can do to improve your memory and mental performance.</p>"+
	"<p>A strong memory depends on the health and vitality of your brain. Whether "+
	"you are a student studying for final exams, a working professional interested "+
	"in doing all you can to stay mentally sharp, or a senior looking to preserve and"+ 
	"enhance your grey matter as you age, there are lots of things "+
	"you can do to improve your memory and mental performance.</p>"+
	"<p>A strong memory depends on the health and vitality of your brain. Whether"+ 
	"you are a student studying for final exams, a working professional interested "+
	"in doing all you can to stay mentally sharp, or a senior looking to preserve and"+ 
	"enhance your grey matter as you age, there are lots of things "+
	"you can do to improve your memory and mental performance.</p>" },
'article-two' :{
	title:'Article-two | Anurag',
	heading:'Article-two',
	date:'Sep 10,2016',
	content: 
	"<p>A strong memory depends on the health and vitality of your brain."+ 
	"Whether you are a "+
	"student studying for final exams, a working professional interested"+ 
	"in doing all you can to stay mentally sharp, or a senior looking to preserve and enhance"+ 
	"your grey matter as you age, there are lots of things "+
	"you can do to improve your memory and mental performance.</p>"+
	"<p>A strong memory depends on the health and vitality of your brain. Whether "+
	"you are a student studying for final exams, a working professional interested "+
	"in doing all you can to stay mentally sharp, or a senior looking to preserve and"+ 
	"enhance your grey matter as you age, there are lots of things "+
	"you can do to improve your memory and mental performance.</p>"+
	"<p>A strong memory depends on the health and vitality of your brain. Whether"+ 
	"you are a student studying for final exams, a working professional interested "+
	"in doing all you can to stay mentally sharp, or a senior looking to preserve and"+ 
	"enhance your grey matter as you age, there are lots of things "+
	"you can do to improve your memory and mental performance.</p>" 
	},
'article-three' :{
	title:'Article-Three | Anurag',
	heading:'Article-Three',
	date:'Sep 20,2016',
	content: 
	"<p>A strong memory depends on the health and vitality of your brain."+ 
	"Whether you are a "+
	"student studying for final exams, a working professional interested"+ 
	"in doing all you can to stay mentally sharp, or a senior looking to preserve and enhance"+ 
	"your grey matter as you age, there are lots of things "+
	"you can do to improve your memory and mental performance.</p>"+
	"<p>A strong memory depends on the health and vitality of your brain. Whether "+
	"you are a student studying for final exams, a working professional interested "+
	"in doing all you can to stay mentally sharp, or a senior looking to preserve and"+ 
	"enhance your grey matter as you age, there are lots of things "+
	"you can do to improve your memory and mental performance.</p>"+
	"<p>A strong memory depends on the health and vitality of your brain. Whether"+ 
	"you are a student studying for final exams, a working professional interested "+
	"in doing all you can to stay mentally sharp, or a senior looking to preserve and"+ 
	"enhance your grey matter as you age, there are lots of things "+
	"you can do to improve your memory and mental performance.</p>" 
	}	
};
function createTemp(data){
	var title=data.title;	
	var heading=data.heading;
	var date=data.date;
	var content=data.content;
	var htmlTemp=
			"<!doctype html>"+
				"<html>"+
				    "<head>"+
				    	"<title> "+ title +"</title>"+
				    	"<meta name='viewport' content='width-device-width, initial-scale=1'/>"+
				        "<link href='/ui/style.css' rel='stylesheet' />"+
				    "</head>"+
				    "<body>"+
				        "<div class='container'>"+
				        	"<div><a href='/'>Home</a></div>"+
				        	"<hr/>"+
				        	"<h3>"+ heading +"</h3>"+
				        	"<div>"+ date.toDateString() +"</div>"+
				        	"<div>"+ content +"</div>"+
				        "</div>"+
				    "</body>"+
				"</html>";
	return htmlTemp;
}

var names=[];
app.get('/submit',function(req,res){
	name=req.query.name;
	names.push(name);
	res.send(JSON.stringify(names));
});


var counter=0;
app.get('/counter', function (req, res) {
  counter++;
  res.send(counter.toString());
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool= new pg.Pool(config);

app.get('/test-db',function(req,res){
	pool.query("SELECT * FROM article",function(err,result){
		if(err){
			res.status(500).send(err.toString());
		}
		else{
			res.send(JSON.stringify(result.rows[0].title));
		}
	});
});
app.get('/articles/:articleName',function(req,res){
	pool.query("SELECT * FROM article WHERE title = '"+req.params.articleName+"'",
		function(err,result){
			if(err){
				res.status(500).send(err.toString());
			}
			else{
				if(result.rows.length === 0){
					res.status(404).send("Article not found");
				}
				else{
					var articleData = result.rows[0];
					res.send(createTemp(articleData));	
				}
			}
		});
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/Upload.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','Upload.jpg'));
});


var port = 5000; // Use 8080 for local development because you might already have apache running on 80
app.listen(5000, function () {
  console.log('IMAD course app listening on port' +port+'!');
});
