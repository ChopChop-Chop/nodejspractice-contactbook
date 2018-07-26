var express = require("express");
var router = express.Router();
var Contact = require("../models/Contact"); // 스키마 넣은 몽구스 데려오기


// Index // 7
router.get("/", function(req, res){
    Contact.find({}, function(err, contacts){
        if(err) return res.json(err);
        res.render("contacts/index", {contacts:contacts});
    });
});
// New // 8
router.get("/new", function(req, res){
    res.render("contacts/new");
});
// Contacts - create // 9
router.post("/", function(req, res){
    Contact.create(req.body, function(err, contacts){
        if(err) return res.json(err);
        res.redirect("/contacts");
    });
});
// Contacts - Show
router.get("/:id", function(req, res) {
    Contact.findOne({_id:req.params.id}, function(err, contact){
        if(err) return res.json(err);
        res.render("contacts/show", {contact:contact});
    });
});
// Contacts - Edit
router.get("/:id/edit", function(req, res) {
    Contact.findOne({_id:req.params.id}, function(err, contact){
        if(err) return res.json(err);
        res.render("contacts/edit", {contact:contact});
    });
});
// Contacts - Update
router.put("/:id", function(req, res) {
    Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
        if(err) return res.json(err);
        res.redirect("/contacts/" + req.params.id);
    });
});
// Contacts - Destroy
router.delete("/:id", function(req, res) {
    Contact.remove({_id:req.params.id}, function(err, contact){
        if(err) return res.json(err);
        res.redirect("/contacts");
    });
});

module.exports = router;
/* 한 파일의 object를 다른 파일에서 사용가능하게 하기 위해서는 
해당 object를 module.exports에 담아줘야 합니다. */