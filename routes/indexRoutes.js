const express = require('express'),
    Blog = require("../models/blogModel")
router = express.Router();


router.get("/", (req, res) => {
    Blog.find().exec()
        .then((foundBlogs) => {
            console.log("ALL BLOGS");
            console.log(foundBlogs);
            res.render('home', { foundBlogs: foundBlogs });
        })
        .catch((err) => {
            console.log("ERRRRRROOOOOOOOORRRRRRRRRRR");
            console.log(err);
            res.send(err);
        });

})
router.get("/about", (req, res) => {
    res.render('about');
});
router.get("/contact", (req, res) => {
    res.render('contact');
});
router.get("/resume", (req, res) => {
    res.render('resume');
});
router.get("/signin", (req, res) => {
    res.render('admin/signin');
});

module.exports = router