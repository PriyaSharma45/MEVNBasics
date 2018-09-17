const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new Schema({
    title: String,
    description: String
});

const test = mongoose.model("test",TestSchema);
module.exports = test;