const mongoose = require('mongoose') // imports mongoose
const Schema = mongoose.Schema; // creates a new instance of a Schema
const bcrypt = require('bcrypt') // imports bcrypt module

const InfoSchema = new Schema({
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    licenseNumber: { type: String, default: '', unique: true},
    age: { type: Number, default: 0 }, 
    userName: { type: String, default: '', required: true, unique: true},
    password: { type: String, default: '', required: true},
    userType: { type: String, default: 'Driver' },
    car_details: {
        make: { type: String, default: '' },
        model: { type: String, default: '' },
        year: { type: String, default: '' },
        platNumber: { type: String, default: '' }
    },
    appointmentId: { type: String, default: ''},
});

InfoSchema.pre('save', function (next) {
    const info = this
    bcrypt.hash(info.password, 10, (error, hash) => {
        info.password = hash
        next()
    })
})

const Info = mongoose.model('Info', InfoSchema); // creates a new model from the schema
module.exports = Info // exports the model