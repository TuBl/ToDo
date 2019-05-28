var mongoose = require("mongoose");


//name

//completed

//date
var todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name cannot be blank!"
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

var ToDo = mongoose.model('ToDo', todoSchema);

module.exports = ToDo;


