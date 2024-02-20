const info = require('../models/InfoModel.js') // imports Info model

module.exports = async (req, res) => {
  try {
    const licenseNumber = req.body.licenseNumber; // get the license number from the request body
    const newData = req.body; // get the new data from the request body

    delete newData._id; // delete the _id property from the new data

    await info.updateOne({ licenseNumber: licenseNumber }, newData); // update the data in MongoDB

    const data = await info.findOne({ licenseNumber }); // query MongoDB based on the license number

    res.json(data); // send the updated data as JSON

  } catch (error) { // handle any errors
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}