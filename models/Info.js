const mongoose = require('mongoose') // imports mongoose
const Schema = mongoose.Schema; // creates a new instance of a Schema

const InfoSchema = new Schema({
    firstName: String,
    lastName: String,
    licenseNumber: String,
    age: Number,
    car_details: {
        make: String,
        model: String,
        year: String,
        platNumber: String
    }
});

const Info = mongoose.model('Info', InfoSchema); // creates a new model from the schema
module.exports = Info // exports the model