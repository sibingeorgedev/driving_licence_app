const express = require('express') // imports express module
const ejs = require('ejs') // imports ejs module
const mongoose = require('mongoose') // imports mongoose 
const expressSession = require('express-session'); // imports express-session module

const app = express() // calls express function to start new Express app

const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

const homeController = require('./controllers/home.js')
const gController = require('./controllers/g.js')
const g2Controller = require('./controllers/g2.js')
const loginController = require('./controllers/login.js')
const licenseController = require('./controllers/getLicenseData.js')
const newInfoController = require('./controllers/newInfo.js')
const updateLicenseDataController = require('./controllers/updateLicenseData.js')
const registerController = require('./controllers/register.js')
const userLoginController = require('./controllers/userLogin.js')
const logoutController = require('./controllers/logout')

mongoose.connect('mongodb+srv://sibingeorge009:MaryGeorge256@sibincluster.ptohacb.mongodb.net/', { useNewUrlParser: true }); // connects to MongoDB

global.loggedIn = null; // creates a global variable to check if user is logged in

app.set('view engine', 'ejs') // tells Express to use EJS as its view engine

app.use(express.static('public')) // tells Express to serve static files from the public folder
app.use(express.json()) // tells Express to parse JSON
app.use(express.urlencoded()) // tells Express to parse URL-encoded data
app.use(expressSession({
  secret: 'keyboard cat'
})) // tells Express to use express-session
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next()
})

// tells Express to listen for requests on port 3000
app.listen(3000, () => {
  console.log("App listening on port 3000")
})

app.get('/', homeController)
app.get('/g', gController)
app.get('/g2', redirectIfAuthenticatedMiddleware, g2Controller)
app.get('/login', loginController)
app.get('/logout', logoutController)

app.post('/g/fetchData', licenseController)
app.post('/g2/info', newInfoController)
app.post('/g/updateData', updateLicenseDataController)
app.post('/users/register', registerController)
app.post('/user/login', userLoginController)
