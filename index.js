var app = require("./config/custom");
var config = require("./config/index");

app.listen(config, function(){
    console.log("Servidor Rodando na Porta " + config.port);
});