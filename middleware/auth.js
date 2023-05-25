const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../db.connection")();
const tableName = "user";
const databaseName = process.env.DATABASE_NAME;
const schema = `${databaseName}.${tableName}`;

dotenv.config();


const jwtSecretKey = process.env.JWT_SECRET_KEY;

const verifyToken = async (req, res, next) => {

    const token = req?.body?.token || req?.query?.token || req?.headers?.["x-access-token"] || req?.cookies?.['x-access-token'];



    if (!token) {
        return res.status(403).json({ message: "Invalid token" });
    }
    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        req.user = decoded;
        const username = req.user.username;

        db.query(`select * from ${schema} where username='${username}';`, (err, result, field) => {

            if (err) {
                console.log(err);
                res.status(401).send("Invalid Token");
            }
            else {

                if (result.length > 0) {
                    req.user = decoded;
                    next();
                }
            }

        });
        // if (!username) {
        //     return res.status(401).send("Invalid Token");
        // } else {
        //     req.user = decoded;
        // }

    } catch (err) {
        console.log(err);
        return res.status(401).send("Invalid Token");
    }
    return;

}

module.exports = verifyToken;