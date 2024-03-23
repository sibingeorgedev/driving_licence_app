const appointment = require('../models/AppointmentModel');
const info = require('../models/InfoModel.js') // imports Info model

module.exports = async (req, res) => {
    try {
        const licenseNumber = req.body.licenseNumber;

        await info.updateOne({ licenseNumber }, req.body);
        await appointment.updateOne({ _id: req.body.appointmentId }, { $set: { isTimeSlotAvailable: false } });

        const userData = await info.findOne({ licenseNumber });
        return res.status(201).json(userData);
    } catch (error) {
        console.error('Error booking appointment slot:', error);
        res.status(500).send('Internal Server Error');
    }
};