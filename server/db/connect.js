const mongoose = require("mongoose");

// uri = "mongodb+srv://admin:qwerty987@cluster0.wd8gsr3.mongodb.net/site?retryWrites=true&w=majority"

const connectDB = (uri) => {
    return mongoose.connect(uri, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    });
};

module.exports = connectDB;