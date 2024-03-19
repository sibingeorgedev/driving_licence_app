const appointment = require('../models/AppointmentModel');

module.exports = async (req, res) => {
    try {
        const allAppointments = await appointment.find();
        res.status(201).json(allAppointments);

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};