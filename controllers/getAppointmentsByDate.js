const appointment = require('../models/AppointmentModel');

module.exports = async (req, res) => {
    try {
        const selectedDate = req.query.date;
        const appointments = await appointment.find({ date: selectedDate });
        res.status(201).json(appointments);

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};