var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
    res.redirect("/contacts");
});

module.exports = router;
/* object(여기서는 router object)가 module이 되어require시에 사용됩니다 */