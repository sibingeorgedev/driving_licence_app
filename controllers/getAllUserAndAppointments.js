const appointment = require('../models/AppointmentModel.js');
const info = require('../models/InfoModel.js') // imports Info model

module.exports = async (req, res) => {
    try {
        // fetch all appointments from the database and send them in the response
        const allUsers = await info.find();
        const allAppointments = await appointment.find();

        const userInfos = allUsers.map(user => {
            const userAppointments = allAppointments.find(appt => appt.id === user.appointmentId);
            return {
                userData: user,
                appointments: userAppointments
            };
        });
        res.status(201).json(userInfos);

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};