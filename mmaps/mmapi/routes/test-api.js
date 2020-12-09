var exp = require('express');
var router = exp.Router();

// Default route.
router.get("/", function(req, res, next) {
    res.send("API WORKING CORRECTLY.");
    next();
})

module.exports = router;