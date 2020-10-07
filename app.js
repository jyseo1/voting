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
	res.render('home');
})

app.get('/deadlines', (req, res) => {
	// Deadline.find()
	// 	.then(result => {
	// 		res.send(result);
	// 	}).catch(err => {
	// 		console.log(err.message);
	// 	});
	Deadline.find({}, (err, allDeadlines) => {
		if(err){
			console.log(err);
		} else {
			res.render('deadlines', {deadlines: allDeadlines});
		}
	});

	// const deadline = new Deadline({
	// 	state: "Alabama",
	// 	inPerson: "Oct. 19",
	// 	mail: "Postmarked by Oct. 19",
	// 	online: 'Oct. 19',
	// 	sameDay: 'N/A'
	// });

	// deadline.save()
	// 	.then((result)=>{
	// 	res.send(result);
	// 	})
	// 	.catch(err => {
	// 		console.log(err.message);
	// 	})
});

app.get('/moreinfo', (req, res) => {
	res.render('moreinfo');
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('votingiscool server is running!');
});
