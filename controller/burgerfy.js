var express = require("express");

var router = express.Router();


var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    console.log("get");
    db.Burger.findAll({}).then(result => {
        var bObject = {
            burgers: result
        };
        console.log(bObject);
        res.render("index", bObject);
    }).catch(err => {
        console.log(err);
    });
});

router.post("/api/burgers", function(req, res) {
    var burger = req.body.name;
    console.log(burger);
    db.Burger.create({
        name: burger
    }).then(result => {
        console.log(result);
        // We have access to the new todo as an argument inside of the callback function
        res.json({ id: result.insertId });
    }).catch(err => {
        console.log(err);
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);
    db.Burger.update({
        eaten: req.body.eaten
    }, {
        where: {
            id: req.params.id
        }
    }).then(result => {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    }).catch(err => {
        console.log(err);
    });
});

router.delete("/api/burgers/:id", function(req, res) {
    var key = req.params.id;

    db.Burger.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
    });
});


// Export routes for server.js to use.
module.exports = router;