var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
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

// DB schema // 4
var contactSchema = mongoose.Schema({
    name:{type:String, required:true, unique:true},
    email:{type:String},
    phone:{type:String}
});
var Contact = mongoose.model("contact", contactSchema);
/* 주소록 DB의 스키마를 생성하고, 그것을 등록. */

// Routes
// Home // 6
app.get("/", function(req, res){
    res.redirect("/contacts");
});
// Contacts - Index // 7
app.get("/contacts", function(req, res){
    Contact.find({}, function(err, contacts){
        if(err) return res.json(err);
        res.render("contacts/index", {contacts:contacts});
    });
});
// Contacts - New // 8
app.get("/contacts/new", function(req, res){
    res.render("contacts/new");
});
// Contacts - create // 9
app.post("/contacts", function(req, res){
    Contact.create(req.body, function(err, contacts){
        if(err) return res.json(err);
        res.redirect("/contacts");
    });
});

app.listen(3000);