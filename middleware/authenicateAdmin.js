const info = require('../models/InfoModel.js') // imports Info model

module.exports = async (req, res, next) => {
    const data = await info.findOne({ _id: req.session.userId }); // find the user's info
    if (data.userType === "Admin") { // if user is a admin
        next();
    } else {
        res.redirect('/'); // otherwise, redirect to the home page
    }
} 