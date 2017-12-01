var jimp = require("jimp");
var imgur = require("imgur");
var restify = require("restify-clients");
var mongoService = require("../services/mongoService");
var ClientPhotos = require("../services/ClientPhotos");

module.exports = (app) => {

    app.get("/resize", (request, response, next) => {

        let client = restify.createJSONClient({
            url: "http://54.152.221.29",
            version: "*"
        });
        let imagens = [];

        client.get("/images.json", async function (err, reqClient, respClient, results) {
            if (err) {
                console.log(err);
                return;
            }
            await ClientPhotos.RequestJSON(results)
                .then(() => {
                    ClientPhotos.UploadImages(results, app, request, response);
                })
                .catch((err) => {
                    console.error(err.message);
                });
        });

        console.log("IMAGEM " + imagens);
        return;
    });

    app.get("/photos", (request, response, next) => {
        mongoService.find(app, request, response);
    });
}