var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Task = {
    url: Schema({
        images: {
            url: [String]
        }
    })
}

module.exports = (db) => db.model("URLS", Task.url);