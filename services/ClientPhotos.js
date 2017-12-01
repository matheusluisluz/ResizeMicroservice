var jimp = require("jimp");
var imgur = require("imgur");
var mongoService = require("../services/mongoService");

exports.ClientPhotos = async (results) => {
    return
}

exports.RequestJSON = async (results) => {
    let array = results.images;

    for (let i = 0; i < array.length; i++) {
        let image = array[i];

        jimp.read(image.url, function (err, photo) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(image.url);
            photo.resize(320, 240).write("../photos/" + image.url.substring(28, 34) + "Small.jpg");
            photo.resize(384, 288).write("../photos/" + image.url.substring(28, 34) + "Medium.jpg");
            photo.resize(640, 480).write("../photos/" + image.url.substring(28, 34) + "Large.jpg");
        });
    }
}

exports.UploadImages = async (results, app, request, response) => {

    let array = results.images;
    let url = [];
    let vetor = [];

    for (let i = 0; i < 2 /*array.length*/; i++) {
        let image = array[i];
        imgur.setAPIUrl("https://api.imgur.com/3/");

        await imgur.uploadFile("../photos/" + image.url.substring(28, 34) + "Small.jpg")
            .then(function (json) {
                //console.log(json.data.link);
                vetor.push(json.data.link)
            })
            .catch(function (err) {
                console.error(err.message);
            });
        await imgur.uploadFile("../photos/" + image.url.substring(28, 34) + "Medium.jpg")
            .then(function (json) {
                //console.log(json.data.link);
                vetor.push(json.data.link)
            })
            .catch(function (err) {
                console.error(err.message);
            });
        await imgur.uploadFile("../photos/" + image.url.substring(28, 34) + "Large.jpg")
            .then(function (json) {
                //console.log(json.data.link);
                vetor.push(json.data.link)
            })
            .catch(function (err) {
                console.error(err.message);
            });
    }
    console.log(vetor);
    mongoService.insert(vetor, app, request, response);
}