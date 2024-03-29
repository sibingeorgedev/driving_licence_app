const appointment = require('../models/AppointmentModel');

module.exports = async (req, res) => {
    try {
        // fetch all appointments from the database and send them in the response
        const allAppointments = await appointment.find();
        res.status(201).json(allAppointments);

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};