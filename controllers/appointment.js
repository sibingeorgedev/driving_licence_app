const info = require('../models/InfoModel.js') // imports Info model

module.exports = async (req, res) => {
    if (req.session.userId) {
        data = await info.findOne({ _id: req.session.userId });
        const appointments = [];
        res.render('appointment', { appointments, date: new Date().toISOString().split('T')[0], data });
    }
}