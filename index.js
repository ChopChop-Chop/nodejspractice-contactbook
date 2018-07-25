var express = require("express");
var mongoose = require("mongoose");
var app = express();

// DB Setting ...
mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true}); // 환경변수에 저장된 값을 사용하여 MongoDB에 접속
var db = mongoose.connection;   // db object
db.once("open", function(){
    console.log("DB Connected");
});
db.on("error", function(err){
    console.log("DB ERROR : ", err);
});

app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

app.get('/', function(req, res){
    res.send('Hello World');
});

app.listen(3000, function(){
    console.log("Server On!");
});