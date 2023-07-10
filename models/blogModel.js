const mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
    blogTitle: { type: String, required: true },
    comSentence: { type: String, required: true },
    comImage: { type: String, required: true },
    blog: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Blog", blogSchema);
