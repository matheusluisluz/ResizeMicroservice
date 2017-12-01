var winston = require("winston");
var fs = require("fs");

if(!fs.existsSync("logs")){
    fs.mkdirSync("logs");
}

module.exports = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: "info",
            filename: "logs/debits.log",
            maxsize: 1048576,
            maxFiles: 10,
            colorize: false
        })
    ]
});