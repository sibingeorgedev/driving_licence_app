const appointment = require('../models/AppointmentModel');

module.exports = async (req, res) => {
    try {
        // fetch appointments on a date from the database and send them in the response
        const selectedDate = req.query.date;
        const appointments = await appointment.find({ date: selectedDate });
        res.status(201).json(appointments);

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};