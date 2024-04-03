const bcrypt = require('bcrypt');
const info = require('../models/InfoModel') // imports Info model
const appointment = require('../models/AppointmentModel'); // imports Appointment model

module.exports = (req, res) => {
    const { username, password } = req.body;
    info.findOne({ userName: username }) // find the user by their username
        .then(user => {
            if (user) { // if user is found
                bcrypt.compare(password, user.password, (error, same) => {
                    if (same) { // if passwords match
                        req.session.userId = user._id;
                        req.session.userType = user.userType;
                        loggedIn = req.session.userId;
                        console.log('User logged in');
                        if (user.licenseNumber) { // if user has a license number render the g view
                            if (user.appointmentId) {
                                appointment.findOne({ _id: user.appointmentId })
                                    .then(userAppointment => {
                                        const userDetails = {
                                            ...user.toObject(),
                                            appointment: userAppointment
                                        };
                                        res.render('g', { data: userDetails });
                                    });
                            } else {
                                res.render('g', { data: user });
                            }
                        }
                        else if (user.userType === "Admin") { // if user is an admin render the appointment view
                            res.render('appointment', { data: user });
                        } else if (user.userType === "Examiner") {
                            return res.render('examiner', { data: user }); // render the examiner view
                        }
                        else { // if user is not an admin or does not have a licenseNumber, the cosider it as his first login and render the g2 view
                            res.render('g2', { data: user });
                        }
                    } else {
                        res.render('login', { showErrorModal: true, data: {} });
                    }
                })
            } else {
                console.log('User not found');
                res.render('login', { showModal: true, data: {} });
            }
        })
        .catch(error => {
            // Handle any errors that occur during the query
            console.error('Error during user login:', error);
            res.status(500).send('Internal Server Error');
        });
};