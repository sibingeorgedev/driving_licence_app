const info = require('../models/InfoModel.js') // imports Info model

module.exports = async (req, res, next) => {
    const data = await info.findOne(req.session.userId); // find the user's info
    if (data.userType === "Driver") { // if user is a driver
        console.log("User is a driver")
        return res.render('g', { data }); // render the g view
    } else if (userData.userType === "Admin") { 
        console.log("User is an admin");
        return res.render('appointment'); // render the appointment view
    }
    next()
} 