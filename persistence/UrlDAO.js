class UrlDAO {
    insertURL(data, model, callback) {
        var url = new model({
            "images": {
                "url": data
            }
        });
        url.save(callback);
        console.log("Persistindo URL");
        
    }
    findURL(model, callback) {
        model.find({}, "images", callback);
        
    }
}

module.exports = () => UrlDAO;