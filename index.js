const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const db = require("./db.connection");
const categoryRoutes = require("./routes/routes");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./routes/routes")(app);

app.listen(4000, () => {
    console.log("Listening on 4000");
});