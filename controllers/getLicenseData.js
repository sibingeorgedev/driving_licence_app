const info = require('../models/InfoModel') // imports Info model

module.exports = async (req, res) => {
    try {
        const { licenseNumber } = req.body; // get the license number from the request body
        console.log(licenseNumber);

        // const hashedLicenseNumber = await bcrypt.hashSync(licenseNumber, 10);
        // console.log(hashedLicenseNumber);
        const data = await info.findOne({ licenseNumber });

        res.render('info', { data })

    } catch (error) { // handle any errors
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}