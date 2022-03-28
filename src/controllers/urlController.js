const shorturl = require("../models/shortenUrl");

function shortenURL(req, res){
    let data = req.body;

    let responseData = {
        success: false,
        msg: "Error in generating short url",
        shorturl : ""
    };

    if(data.url){
        shorturl.shortenURL(data, function(err, result){
            if(err){
                console.log("error in shortenURL");
                return res.status(500).send(responseData)
            }
            shorturl.checkPresence(function(err1, result1){
                if(err1){
                    console.log("Error in presence function");
                    return res.status(500).send(responseData)
                }else if(result.length > 0){
                    console.log("please generate another url, the url already exists");

                    return res.status(500).send(responseData);
                }else {
                    responseData.msg = "short url generated successfully";
                    responseData.success = true;
                    responseData.shorturl = result.shorturl;
    
                    return res.status(200).send(responseData);
                }
            })
        });
    }
}


function getAllUrl(req, res){
    let responseData = {
        success: false,
        msg: "Error in fetching urls",
        result : ""
    };
    shorturl.getAllUrl(function(err, result){
        if(err){
            console.log("error infetching urls");
            res.status(500).send(responseData);
        }else{
            console.log("urls fetched successfully");

            responseData.msg = "urls fetched successfully";
            responseData.success = true;
            responseData.result = result;
            return res.status(200).send(responseData);
        }
    })
}

function getUrlByUserId(req, res){
    let data = req.body;
    shorturl.getUrlByUserId(data, function(err, result) {
        if(err) {
            return res.status(401).send({message: "error in getting url by user"});
        }
        return res.status(500).send(result)
    });
}


module.exports = {shortenURL, getAllUrl, getUrlByUserId};