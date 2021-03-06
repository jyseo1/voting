require('dotenv').config();

const express = require('express'),
	app			= express(),
	mongoose		= require('mongoose');
	Deadline		= require('./models/deadline');


app.use(express.static(__dirname + '/public'));

// Connecting to Mongo Database
const url = process.env.DATABASEURL || 'mongodb://localhost:27017/voting';
retryWrites=true;
mongoose.connect(url, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log('Connected to database!');
}).catch(err => {
	console.log('ERROR: ', err.message);
})
mongoose.set("useFindAndModify", false);

app.set("view engine", "ejs");

// ROUTES
app.get('/', (req, res) => {
	res.render('home', { page: "home" });
});

app.get('/registrationstatus', (req, res) => {
	res.render('registrationstatus', {page: "registrationstatus"});
});

app.get('/absenteeballot', (req, res) => {
	res.render('absenteeballot', {page: "absenteeballot"});
});

app.get('/howtovote', (req, res) => {
	res.render('howtovote', {page: "howtovote"});
});

app.get('/deadlines', (req, res) => {
	Deadline.find({}, (err, allDeadlines) => {
		if(err){
			console.log("THIS IS DB ERROR: " + err);
		} else {
			res.render('deadlines', {deadlines: allDeadlines, page: "deadlines"});
		}
	}).sort({'state': 1});
});

app.get('/moreinfo', (req, res) => {
	res.render('moreinfo', {page: "moreinfo"});
});

app.get('*', (req, res) => {
	res.render('/');
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('votingiscool server is running! On port: ' + port);
});
