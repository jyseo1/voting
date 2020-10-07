const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deadlineSchema = new Schema({
	state: String,
	inPerson: String,
	mail: String,
	online: String,
	sameDay: String
});


module.exports = mongoose.model("Deadline", deadlineSchema);
