var mongoose = require("mongoose");

// DB schema // 4
var contactSchema = mongoose.Schema({
    name:{type:String, required:true, unique:true},
    email:{type:String},
    phone:{type:String}
});
var Contact = mongoose.model("contact", contactSchema);
/* 주소록 DB의 스키마를 생성하고, 그것을 등록. */

module.exports = Contact;