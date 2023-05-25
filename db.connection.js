const mysql = require("mysql2");

const databaseName = "digitalflake";

// database/connection.js
module.exports = () => {

    var newConnection;

    connection = mysql.createConnection({
        host: "localhost",
        user: "neo",
        password: "password",
        // database: databaseName
    });



    connection.connect(function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('Connected!:)');
            connection.promise().query(`create database if not exists ${databaseName};`)
                .then((err, result, field) => {

                    connection.query(`create table if not exists ${databaseName}.product(
                                    id int not null AUTO_INCREMENT,
                                    name varchar(255),
                                    packsize varchar(255),
                                    categoryID int,
                                    mrp varchar(255),
                                    productImage VARCHAR(500),
                                    status VARCHAR(255),
                                    primary key (id)
                                    );`);

                    connection.query(`create table if not exists ${databaseName}.category
                                    (
                                    id int not null AUTO_INCREMENT,
                                    name varchar(255),
                                    description varchar(255),
                                    status VARCHAR(255),
                                    primary key (id)
                                    );`);


                    connection.query(`create table if not exists ${databaseName}.user
                                    (
                                    id int not null AUTO_INCREMENT,
                                    name varchar(255),
                                    username varchar(255),
                                    password VARCHAR(255),
                                    primary key (id)
                                    );`);

                })
        }
    });

    return connection;
}