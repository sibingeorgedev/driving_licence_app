const mongoose = require('mongoose')
const Schema = mongoose.Schema;

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

const Info = mongoose.model('Info', InfoSchema);
module.exports = Info