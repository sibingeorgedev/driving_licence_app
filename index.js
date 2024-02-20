const express = require('express') // imports express module
const ejs = require('ejs') // imports ejs module
const mongoose = require('mongoose') // imports mongoose 

const app = express() // calls express function to start new Express app

const homeController = require('./controllers/home.js')
const gController = require('./controllers/g.js')
const g2Controller = require('./controllers/g2.js')
const loginController = require('./controllers/login.js')
const licenseController = require('./controllers/getLicenseData.js')
const newInfoController = require('./controllers/newInfo.js')
const updateLicenseDataController = require('./controllers/updateLicenseData.js')
const registerController = require('./controllers/register.js')

mongoose.connect('mongodb+srv://sibingeorge009:MaryGeorge256@sibincluster.ptohacb.mongodb.net/', { useNewUrlParser: true }); // connects to MongoDB

app.use(express.static('public')) // tells Express to serve static files from the public folder
app.use(express.json()) // tells Express to parse JSON
app.use(express.urlencoded()) // tells Express to parse URL-encoded data
app.set('view engine', 'ejs') // tells Express to use EJS as its view engine

// tells Express to listen for requests on port 3000
app.listen(3000, () => {
  console.log("App listening on port 3000")
})

app.get('/', homeController)
app.get('/g', gController)
app.get('/g2', g2Controller)
app.get('/login', loginController)
app.post('/g/fetchData', licenseController)
app.post('/g2/info', newInfoController)
app.post('/g/updateData', updateLicenseDataController)
app.post('/users/register', registerController)
