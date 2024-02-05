const express = require('express')
const ejs = require('ejs') // imports ejs module
const mongoose = require('mongoose') // imports mongoose module

const app = express() // calls express function to start new Express app
const path = require('path')
const info = require('./models/Info.js')
mongoose.connect('mongodb+srv://sibingeorge009:MaryGeorge256@sibincluster.ptohacb.mongodb.net/', { useNewUrlParser: true });

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs') // tells Express to use EJS as its view engine

app.listen(3000, () => {
  console.log("App listening on port 3000")
})

app.get('/', (req, res) => {
  res.render('index');
})

app.post('/g/fetchData', async (req, res) => {
  try {
    const { licenseNumber } = req.body;

    // Query MongoDB based on the license number
    const data = await info.findOne({ licenseNumber });

    // Render a view or send the result as JSON back to the client
    if (data) {
      console.log(data);
      // If data is found, render a view or send it as JSON
      res.render('info', { data });
    } else {
      // If no data is found, handle accordingly
      res.render('notFound');
    }
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/g', (req, res) => {
  res.render('g');
})

app.get('/g2', (req, res) => {
  res.render('g2');
})

app.get('/login', (req, res) => {
  res.render('login');
})

app.post('/g2/info', async (req, res) => {
  try {
    console.log(req.body);
    await info.create(req.body);
  }
  catch (error) {
    console.log(error);
  }
  res.redirect('/');
})