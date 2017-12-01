const logger = require("../services/logger");

exports.insert = (data, app, req, resp) => {
    //TODO refactoring
    let conn = require("../persistence/connectionManager");
    let model = require("../model/ModelUrl");
    let urlDAO = new app.persistence.UrlDAO();
    
    urlDAO.insertURL(data, model(conn), (err, results) => {
        if (err) {
            resp.status(500).json({ message: "Error in Receiving" });
            console.log(err);
            return;
        }
        console.log(results);
        resp.status(200).json({ message: "Received" });
        logger.info({ message: "Received" })
        return;
    });
}

exports.find = (app, req, resp) => {
    
        let conn = require("../persistence/connectionManager");
        let model = require("../model/ModelUrl");
        let urlDAO = new app.persistence.UrlDAO();
    
        urlDAO.findURL(model(conn), (err, results) => {
            if (err) {
                console.log(err);
                resp.status(500).json({ message: "Error in the Search of URL"});
                return;
            } else if (results == "" || typeof results === "undefined" || results == null) {
                console.log("No URL Found");
                resp.status(404).json({ message: "No URL Found" });
                return;
            }
            else {
                console.log(results);
                resp.status(200).json(results);
                logger.info(results);
                return;
            }
        });
    }