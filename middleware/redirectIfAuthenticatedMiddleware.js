const info = require('../models/InfoModel.js') // imports Info model

module.exports = async (req, res, next) => {
    if (req.session.userId) {
        const data = await info.findOne(req.session.userId);
        return res.render('g2', { data }); // redirects to index page if user is already logged in
    }
    next()
}