const mongoose = require('mongoose') // imports mongoose
const Schema = mongoose.Schema; // creates a new instance of a Schema

const AppointmentSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    isTimeSlotAvailable: {
        type: Boolean,
        default: true,
        required: true
    },
    testType: {
        type: String,
        default: '',
    }
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment; 