const info = require('../models/InfoModel.js') // imports Info model

module.exports = async (req, res) => {
    try {
        // await info.create(req.body)
        const newUser = new info(req.body);
        await newUser.save();
        res.status(200).send("User created successfully");
    }

    catch (error) {
        console.log(error);
    }
}