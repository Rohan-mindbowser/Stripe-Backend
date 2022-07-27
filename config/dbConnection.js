const mongoose = require("mongoose");

//DB uri
var uri = "mongodb://localhost:27017/stripe_db";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

module.exports = connection