var mongoose = require("mongoose")
var personSchema = require("../schemas/personSchema");

var Person = mongoose.model("Person",personSchema);

module.exports = Person;