const appointment = require('../models/AppointmentModel');
const info = require('../models/InfoModel.js') // imports Info model

module.exports = async (req, res) => {
    try {
        const licenseNumber = req.body.licenseNumber;

        // update the user's appointment details
        await info.updateOne({ licenseNumber }, req.body);
        // update the appointment slot to be unavailable
        await appointment.updateOne({ _id: req.body.appointmentId }, { $set: { isTimeSlotAvailable: false } });

        // fetch the updated user data and send it in the response
        const userData = await info.findOne({ licenseNumber });
        res.status(201).json(userData);
    } catch (error) {
        console.error('Error booking appointment slot:', error);
        res.status(500).send('Internal Server Error');
    }
};