const express = require('express') // imports express module
const ejs = require('ejs') // imports ejs module
const mongoose = require('mongoose') // imports mongoose module

const app = express() // calls express function to start new Express app
const path = require('path') // imports path module
const info = require('./models/Info.js') // imports Info model
mongoose.connect('mongodb+srv://sibingeorge009:MaryGeorge256@sibincluster.ptohacb.mongodb.net/', { useNewUrlParser: true }); // connects to MongoDB

app.use(express.static('public')) // tells Express to serve static files from the public folder
app.use(express.json()) // tells Express to parse JSON
app.use(express.urlencoded()) // tells Express to parse URL-encoded data
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs') // tells Express to use EJS as its view engine

// tells Express to listen for requests on port 3000
app.listen(3000, () => {
  console.log("App listening on port 3000")
})

// creates a route that sends a response to the client
app.get('/', (req, res) => {
  res.render('index');
})

// creates a route that sends a response to the client
app.post('/g/fetchData', async (req, res) => {
  try {
    const { licenseNumber } = req.body; // get the license number from the request body

    // query MongoDB based on the license number
    const data = await info.findOne({ licenseNumber });

    // if data is found, render a view or send it as JSON
    res.render('info', { data });

  } catch (error) { // handle any errors
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// creates a route that sends the g.ejs file to the client
app.get('/g', (req, res) => {
  res.render('g');
})

// creates a route that sends the g2.ejs file to the client
app.get('/g2', (req, res) => {
  res.render('g2');
})

// creates a route that sends the login.ejs file to the client
app.get('/login', (req, res) => {
  res.render('login');
})

// creates a route that sends the register.ejs file to the client
app.post('/g2/info', async (req, res) => {
  try {
    console.log(req.body);
    await info.create(req.body);
  }
  catch (error) {
    console.log(error);
  }
  res.render('g2');
})

// creates a route that updates data in MongoDB
app.post('/g/updateData', async (req, res) => {
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
});