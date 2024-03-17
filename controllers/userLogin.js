const bcrypt = require('bcrypt');
const info = require('../models/InfoModel') // imports Info model

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
                        if (user.licenseNumber) {
                            res.render('g', { data: user });
                        }
                        else {
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