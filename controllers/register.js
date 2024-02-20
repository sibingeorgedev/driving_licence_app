const info = require('../models/InfoModel.js') // imports Info model

module.exports = async (req, res) => {
    console.log(req.body)
    try {
        await info.create(req.body)
        res.redirect('/')
    }

    catch (error) {
        // return res.redirect('/auth/register')
    }
}