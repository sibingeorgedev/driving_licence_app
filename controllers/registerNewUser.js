const info = require('../models/InfoModel.js') // imports Info model

module.exports = async (req, res) => {
    try {
        await info.create(req.body)
        res.status(200).send("User created successfully");
    }

    catch (error) {
        // return res.redirect('/auth/register')
    }
}