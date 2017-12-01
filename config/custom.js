const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const logger = require("../services/logger");

var app = express();

app.use(morgan("common", {
    stream: {
        write: function (mensagem) {
            logger.info(mensagem);
        }
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

consign()
    .include("controllers")
    .include("persistence")
    //.include("services")
    .into(app)

module.exports = app;