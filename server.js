var express = require('express');
var morgan = require('morgan');
var path = require('path');

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
				        	"<div>"+ date +"</div>"+
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

app.get('/:articleName',function(req,res){
	var articleName=req.params.articleName;
    res.send(createTemp(articles[articleName]));
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
