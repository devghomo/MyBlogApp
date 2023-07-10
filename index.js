const mongoose = require("mongoose"),
    express = require("express"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    expressSession = require("express-session"),
    User = require('./models/userModel'),
    bodyParser = require('body-parser'),
    app = express();


const indexRoutes = require("./routes/indexRoutes"),
    adminRoutes = require("./routes/adminRoutes")
blogRoutes = require("./routes/blogRoutes")

mongoose.connect("mongodb://127.0.0.1:27017/BlogApp")
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(require("express-session")({
    secret: "bu bizim güvenlik cümlemizdir",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next()
})

app.use(indexRoutes)
app.use(adminRoutes)
app.use(blogRoutes)
const server = app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('http://localhost:3000', server.address().port);

})
