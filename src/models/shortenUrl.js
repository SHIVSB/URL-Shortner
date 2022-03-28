const res = require("express/lib/response");
const sqlConnection = require("../services/sqlConnection");

var ans;

function shortenURL(data, cb){
    var sql = `INSERT INTO urlDB (ID, url, shorturl, userID)
               values(ID, ?, ?,3)`;

    var values = [];
    values.push(data.url);
    
    var text = '';    
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    for (var i = 0; i < 5; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }  

    values.push(text);
    ans = text;
    sqlConnection.executeQuery(sql, values, function(err, result){
        result.shorturl = text;
        cb(err, result);
    })
}

function checkPresence(cb){

    var sql = `SELECT shorturl FROM urlDB WHERE shorturl = "${ans}"`;
    var values = [];

    sqlConnection.executeQuery(sql, values, function(err, result){
        cb(err, result);
    })
}

function getAllUrl(cb){
    var sql = `Select * from urlDB`;

    var values = [];

    sqlConnection.executeQuery(sql, values, function(err, result){
        cb(err, result);
    });
}

function getUrlByUserId(userID, cb){
    let sql = `SELECT shorturl
               FROM urlDB WHERE 
               userID = ?`;
    let values = [];
    values.push(userID);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

module.exports = {shortenURL, getAllUrl, getUrlByUserId, checkPresence};