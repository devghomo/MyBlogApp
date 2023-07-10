const express = require('express'),
    User = require('../models/userModel'),
    passport = require("passport"),
    router = express.Router();
let adminActions = [

    {
        actionId: 1,
        actionName: "signup",
        displayName: "New User"
    },

    {
        actionId: 2,
        actionName: "addNewBlog",
        displayName: "Add New Blog"
    },

]
router.get("/admin", isLoggedIn, (req, res) => {
    res.render("admin/admin", { adminActions: adminActions })
})
router.get("/signin", (req, res) => {
    res.render('admin/signin');
});
router.post("/signin", passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/signin"
    }), (req, res) => { })
router.post("/signin", (req, res) => {

})
router.get("/signup", isLoggedIn, (req, res) => {
    res.render("admin/signup");
});
router.post("/signup", isLoggedIn, (req, res) => {
    const { username, password, name } = req.body;
    const newUser = new User({ username, name }); // name alanını kaydet
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.redirect("/signup");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/");
        });
    });
});

// Diğer rotalar...

router.get('/signout', function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.error(err);
        }
        res.redirect('/');
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}



module.exports = router;


