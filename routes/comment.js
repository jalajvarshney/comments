var express = require("express");
var router = express.Router();
var Comment = require("../models/comment");
var middleware = require("../middleware");


//display comments
router.get("/", (req, res)=>{
    Comment.find({}, (err, comments)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("comments", {comments: comments});
        }
    });
});


//create new comment
router.post("/", middleware.isLoggedIn, (req, res)=>{
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    Comment.create({ text: req.body.text, author: author }, (err, comment) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});


//upvote logic
router.get("/up/:id", middleware.isLoggedIn, (req, res)=>{
    Comment.findById(req.params.id, (err, foundComment)=>{
        if(err){
            console.log(err);
        }
        else{
            if (foundComment.upvotes.indexOf(req.user._id) >= 0 || foundComment.downvotes.indexOf(req.user._id) >= 0)
            {
                res.redirect("/");
            }
            else
            {
                var newComment = foundComment;
                newComment.upvotes.push(req.user._id);
                Comment.findByIdAndUpdate(req.params.id, newComment, (err, updated)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.redirect("/");
                    }
                })
            }
        }
    });
});



//downvote logic
router.get("/down/:id", middleware.isLoggedIn, (req, res) => {
    Comment.findById(req.params.id, (err, foundComment) => {
        if (err) {
            console.log(err);
        }
        else {
            if (foundComment.upvotes.indexOf(req.user._id) >= 0 || foundComment.downvotes.indexOf(req.user._id) >= 0) {
                res.redirect("/");
            }
            else {
                var newComment = foundComment;
                newComment.downvotes.push(req.user._id);
                Comment.findByIdAndUpdate(req.params.id, newComment, (err, updated) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.redirect("/");
                    }
                })
            }
        }
    });
});


module.exports = router;