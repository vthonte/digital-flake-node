var Q = require("q");
const tableName = "product";
const databaseName = process.env.DATABASE_NAME;
const schema = `${databaseName}.${tableName}`;
const db = require("../db.connection")();
var service = {};

service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service._delete = _delete;
module.exports = service;

async function create(data) {
    var deferred = Q.defer();
    // let db = await dbo.connect();
    const { name, categoryId, packSize, mrp, productImage, status } = data;
    if (!categoryId) {
        deferred.reject("Please provide proper categoryId");
        return deferred.promise;
    }

    var form_data = {
        name,
        categoryId,
        packSize,
        mrp,
        productImage,
        status
    }
    // insert query
    db.query(`INSERT INTO ${schema} SET ?`, form_data, function (err, result) {
        //if(err) throw err
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(result);
        }
    })

    return deferred.promise;
}



async function getAll(data) {
    var deferred = Q.defer();
    // let db = await dbo.connect();

    // insert query
    db.query(`SELECT p.*,c.name as category 
    from ${databaseName}.product p, ${databaseName}.category c
    where p.categoryId = c.id`, function (err, result) {
        //if(err) throw err
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(result);
        }
    })

    return deferred.promise;
}



async function update(data) {
    var deferred = Q.defer();
    // let db = await dbo.connect();
    if (!data?.id) {
        deferred.reject("Please provide id");
        return deferred.promise;
    }

    // insert query
    db.query(`UPDATE ${schema} set `, function (err, result) {
        //if(err) throw err
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(result);
        }
    })

    return deferred.promise;
}



async function _delete(data) {
    var deferred = Q.defer();
    // let db = await dbo.connect();

    if (!data?.id) {
        deferred.reject("Please enter id");
        return deferred.promise;
    }

    // insert query
    db.query(`DELETE FROM ${schema} where id=${data?.id}`, function (err, result) {
        //if(err) throw err
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(result);
        }
    })

    return deferred.promise;
}

async function getById(data) {
    var deferred = Q.defer();
    // let db = await dbo.connect();

    if (!data?.id) {
        deferred.reject("Please enter id");
        return deferred.promise;
    }

    // insert query
    db.query(`SELECT * FROM ${schema} where id=${data?.id}`, function (err, result) {
        //if(err) throw err
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(result);
        }
    })

    return deferred.promise;
}