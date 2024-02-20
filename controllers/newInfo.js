const info = require('../models/InfoModel.js') // imports Info model

module.exports = async (req, res) => {
    try {
        await info.create(req.body);
        console.log("Data Saved Successfully");
    }
    catch (error) {
        console.log(error);
    }
    res.render('g2');
}