const info = require('../models/InfoModel.js') // imports Info model
const appointment = require('../models/AppointmentModel'); // imports Appointment model
module.exports = async (req, res) => {
    if (req.session.userId) {
        data = await info.findOne({ _id: req.session.userId });
        if (data.appointmentId) {
            const userAppointment = await appointment.findOne({ _id: data.appointmentId });
            const userDetails = {
                ...data.toObject(),
                appointment: userAppointment
            };
            res.render('g2', { data: userDetails });
        } else {
            res.render('g2', { data });
        }
    } else {
        res.render('g2');
    }
}
