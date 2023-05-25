var Q = require("q");
const db = require("../db.connection")();
const bcrypt = require("bcrypt");
const tableName = "user";
const databaseName = process.env.DATABASE_NAME;
const schema = `${databaseName}.${tableName}`;
var service = {};
const jwt = require("jsonwebtoken");

// service.getAll = getAll;
// service.getById = getById;
service.create = create;
service.login = login;
// service.delete = _delete;
// service.count = count;
service.findOne = findOne;
module.exports = service;



async function create(query) {
    var deferred = Q.defer();


    if (query.password) {
        var hashedPassword = await bcrypt.hash(query.password, 10);
    } else {
        deferred.reject("Please provide password");
        return deferred.promise
    }

    var form_data = {
        name: query?.name,
        username: query?.username,
        password: hashedPassword,
    }



    db.query(`select * from ${schema} where username=?`, [query.username], (err, result, fields) => {

        if (result.length > 0) {
            deferred.reject("User already exists");
            return;
        } else {

            db.query(`INSERT INTO ${schema} SET ?`, form_data, (err, result, fields) => {
                if (err) {
                    deferred.reject("Unable to create user");
                } else {
                    deferred.resolve(result);
                }
            });
        }
    });



    return deferred.promise;
}



async function findOne(query) {
    var deferred = Q.defer();
    let db = await dbo.connect();
    db.collection(collection).findOne(query, async function (err, res) {
        if (err) deferred.reject(err.name + ": " + err.message);
        deferred.resolve(res);
    });
    return deferred.promise;
}


async function login(query) {
    var deferred = Q.defer();


    try {

        db.query(`select * from ${schema} where username=?`, [query.username],
            (err, result, fields) => {
                if (err) {
                    deferred.reject("error while fetching");
                } else {
                    if (result[0]?.username == query.username
                        &&
                        bcrypt.compareSync(query.password, result[0]?.password)) {
                        deferred.resolve({
                            username: result[0]?.username,
                            token: jwt.sign({ username: result[0]?.username },
                                process.env.JWT_SECRET_KEY,
                                {
                                    expiresIn: '10h'
                                })
                        });
                    } else {
                        deferred.reject("Invalid Credentials");
                    }
                }
            });

    } catch (error) {
        console.log(error);
    }

    return deferred.promise;
}
