const info = require('../models/InfoModel.js') // imports Info model
module.exports = async (req, res) => {
    if (req.session.userId) { 
        data = await info.findOne({ _id: req.session.userId });
        res.render('g2', { data });
    } else {
        res.render('g2');
    }
}
