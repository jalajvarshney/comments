var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//==========================================
//         Authentication Routes
//==========================================


// show register form
router.get("/register", (req, res) => {
    res.render("register");
});


//Sign up logic
router.post("/register", (req, res) => {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/");
        });
    });
});


//show login form
router.get("/login", (req, res) => {
    res.render("login");
});

//login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), (req, res) => {
});

// logout route
router.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/");
});


module.exports = router;