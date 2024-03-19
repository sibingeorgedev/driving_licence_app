const appointment = require('../models/AppointmentModel');

module.exports = async (req, res) => {
    try {
        const { date, time } = req.body;

        // check if the appointment slot already exists
        const existingAppointment = await appointment.findOne({ date, time });

        if (existingAppointment) {
            return res.status(400).send('Appointment slot already exists.');
        }

        // Create a new appointment slot
        await appointment.create({ date, time })

        // const savedAppointment = await appointment.findOne({ date, time });
        // res.status(201).json(savedAppointment); // Send the created appointment data in the response

        const allAppointments = await appointment.find();
        res.status(201).json(allAppointments);

    } catch (error) {
        console.error('Error creating appointment slot:', error);
        res.status(500).send('Internal Server Error');
    }
};