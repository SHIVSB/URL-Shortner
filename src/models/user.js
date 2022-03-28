const sqlConnection = require("../services/sqlConnection");
const bcrypt = require("bcryptjs");
const auth = require("../util/auth");

function strongSignup(data, cb) {
    let sql = `INSERT INTO users 
    (username, password, CreatedAt, UpdatedAt)
    Values (? , ? , now(), now())`;
    let values = [];
    values.push(data.username);
    bcrypt.hash(data.password, 8, function(err, hash) {
        if(err) {
            console.log(err);
            return;
        }
        values.push(hash);
        sqlConnection.executeQuery(sql, values, function(err, result) {
            cb(err, result);
        });
    });
}

function getUsersSignupDetails(data, cb) {
    let sql = "SELECT * FROM users WHERE username = ?";
    let values = [];
    values.push(data.username);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function strongLogin(data, cb) {
    var sql = `SELECT username,ID,password FROM users WHERE username = ?`;

    var values = [];

    values.push(data.username);

    sqlConnection.executeQuery(sql, values, function(err, result){
        var isValid = bcrypt.compareSync(data.password, result[0].password);
        
        if(isValid){
            const token = auth.newToken(result[0]);
            let responseData = [
                {
                    name : result[0].username,
                    id : result[0].id,
                    authToken : token
                }
            ];
            console.log(responseData, result);
            cb(err, responseData);
        }else{
            cb(err, []);
        }
    })
}

function getUserById(id, cb) {
    let sql = `SELECT ID as UserId, Username
               FROM Users WHERE 
               ID = ?`;
    let values = [];
    values.push(id);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}



module.exports = {getUsersSignupDetails, getUserById,strongSignup, strongLogin};