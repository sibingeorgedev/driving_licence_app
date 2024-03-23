const info = require('../models/InfoModel.js') // imports Info model

module.exports = async (req, res) => {
    try {
        const newUser = new info(req.body);
        await newUser.save();
        res.status(200).send("User created successfully");
    }

    catch (error) {
        console.log(error);
        const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
        req.flash('validationErrors', validationErrors)
        req.flash('data', req.body)
    }
}