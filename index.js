var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
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

// Other Setting
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json()); // 2
app.use(bodyParser.urlencoded({extended:true}));  // 3
/* body Parser를 이용해 스트림의 form data를 req.body로 옮겨 담습니다.
2번은 json 데이터를 3번은 urlencoded data를 분석해서 req.body를 생성합니다.
app.use()의 첫번째 인자가 비어있으면 웹앱이 요청을 수신할 때마다 인자의 함수가 실행됩니다.
*/
app.use(methodOverride("_method"));
/*
_method의 query로 들어오는 값으로 HTTP method를 바꿉니다. 
예를들어 http://example.com/category/id?_method=delete를 받으면 
_method의 값인 delete을 읽어 해당 request의 HTTP method를 delete으로 바꿉니다.
*/

// Routes
app.use("/", require("./routes/home")); // 모듈 호출
app.use("/contacts", require("./routes/contacts")); // 모듈 호출



app.listen(3000);