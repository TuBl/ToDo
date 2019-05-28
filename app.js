var express = require("express"),
    app = express();

var todoRoutes = require("./routes/todos");
//include to read request data
var bodyParser = require("body-parser");
//use bodt parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//app.set("view engine", "ejs");

app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname + "/public"));




app.get('/', function(req, res){
   res.sendFile("index.html")
});

app.use('/api/todos', todoRoutes);
    
app.listen(process.env.PORT, function(){
    console.log("App is running on port " + process.env.PORT);
})