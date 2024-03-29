const info = require('../models/InfoModel.js') // imports Info model

module.exports = async (req, res) => {
    try {
        let data = {}; // initialize data object
        if (loggedIn) {
            // update the user's info details
            await info.updateOne({ _id: loggedIn }, req.body);
            data = await info.findOne({ licenseNumber: req.body.licenseNumber });
        }
        console.log("Data Updated Successfully");
        res.render('g', { data: data });
    }
    catch (error) {
        console.log(error);
    }
}