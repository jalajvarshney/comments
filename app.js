var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    flash      = require("connect-flash");
    Campground = require("./models/campgrounds"),
    seedDB     = require("./seeds"),
    Comment    = require("./models/comment"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local")
    User = require("./models/user");
    methodOverride = require("method-override");