var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local")
    methodOverride = require("method-override")
    User = require("./models/user");;


// requiring routes
var comment = require("./routes/comment.js");
var indexRoutes = require("./routes/index")


mongoose.connect("mongodb://localhost/comment");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));


//passport config
app.use(require("express-session")({
    secret: "this is secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use(comment);
app.use(indexRoutes);

app.listen(3000, ()=>{
    console.log("Server running at 3000");
})