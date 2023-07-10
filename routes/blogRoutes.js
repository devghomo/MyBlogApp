
const express = require('express'),
    Blog = require('../models/blogModel'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


router.get("/addNewBlog", isLoggedIn, (req, res) => {
    res.render("blog/newBlog")
})

router.post("/addNewBlog", isLoggedIn, (req, res) => {
    let title = req.body.blogTitle;
    let comSentence = req.body.comSentence;
    let comImage = req.body.comImage;
    let blog = req.body.blog;
    let author = req.body.author;
    let newBlog = { blogTitle: title, comSentence: comSentence, comImage: comImage, blog: blog, author: author };

    Blog.create(newBlog)
        .then((addedBlog) => {
            console.log(addedBlog);
            //res.status(201).json(addedBlog);
            res.redirect("/addNewBlog");
        })
        .catch((err) => {
            console.log("========ERROR========");
            console.log(err);
            res.send(err);
        });

});
router.get("/blogs/:blogId", (req, res) => {
    Blog.findById(req.params.blogId)
        .then((foundBlog) => {
            res.render("blog/showBlog", { foundBlog: foundBlog })
        })
        .catch((err) => {
            console.log("========ERROR========");
            console.log(err);
            res.send(err);
        })
})

router.get("/testing", (req, res) => {
    Blog.find()
        .then((foundBlogs) => {
            res.json(foundBlogs)
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = router;