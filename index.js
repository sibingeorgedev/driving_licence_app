const express = require('express'); // imports express module
const ejs = require('ejs'); // imports ejs module
const mongoose = require('mongoose'); // imports mongoose 
const expressSession = require('express-session'); // imports express-session module
const flash = require('connect-flash'); // imports connect-flash module

const app = express(); // calls express function to start new Express app

const authenticateLoggedInMiddleware = require('./middleware/authenticateLogin.js');
const authenticateDriverMiddleware = require('./middleware/authenticateDriver.js');
const authenticateAdminMiddleware = require('./middleware/authenicateAdmin.js');
const authenticateExaminerMiddleware = require('./middleware/authenicateExaminer.js');

const homeController = require('./controllers/getHomePage.js');
const gController = require('./controllers/getGPage.js');
const g2Controller = require('./controllers/getG2Page.js');
const loginController = require('./controllers/getLoginPage.js');
const newInfoController = require('./controllers/createNewInfo.js');
const updateLicenseDataController = require('./controllers/updateLicenseData.js');
const registerController = require('./controllers/registerNewUser.js');
const userLoginController = require('./controllers/userLogin.js');
const logoutController = require('./controllers/userLogout.js');
const appointmentController = require('./controllers/getAppointmentPage.js');
const createAppointmentController = require('./controllers/createAppointment');
const getAllAppointmentController = require('./controllers/getAllAppointment');
const getAppointmentsByDateController = require('./controllers/getAppointmentsByDate');
const bookG2AppointmentController = require('./controllers/bookG2Appointment.js');
const examinerController = require('./controllers/getExaminerPage.js');
const bookGAppointmentController = require('./controllers/bookGAppointment.js');
const getAllUserAndAppointmentsController = require('./controllers/getAllUserAndAppointments.js');
const updateTestDetailsController = require('./controllers/updateTestDetails.js');
const adminController = require('./controllers/getAdminPage.js');

mongoose.connect('mongodb+srv://sibingeorge009:MaryGeorge256@sibincluster.ptohacb.mongodb.net/', { useNewUrlParser: true }); // connects to MongoDB

global.loggedIn = null;

app.set('view engine', 'ejs'); // tells Express to use EJS as its view engine

app.use(express.static('public')); // tells Express to serve static files from the public folder
app.use(express.json()); // tells Express to parse JSON
app.use(express.urlencoded()); // tells Express to parse URL-encoded data
app.use(flash()); // tells Express to use connect-flash
app.use(expressSession({
  secret: 'keyboard cat'
})); // tells Express to use express-session
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next()
});

// tells Express to listen for requests on port 3000
app.listen(3000, () => {
  console.log("App listening on port 3000")
});

app.get('/', homeController);
app.get('/login', loginController);
app.get('/logout', logoutController);
app.get('/g', authenticateLoggedInMiddleware, authenticateDriverMiddleware, gController);
app.get('/g2', authenticateLoggedInMiddleware, authenticateDriverMiddleware, g2Controller);
app.get('/admin', authenticateLoggedInMiddleware, authenticateAdminMiddleware, adminController);
app.get('/appointment', authenticateLoggedInMiddleware, authenticateAdminMiddleware, appointmentController);
app.get('/examiner', authenticateLoggedInMiddleware, authenticateExaminerMiddleware, examinerController);
app.get('/getAllAppointment', getAllAppointmentController);
app.get('/getAppointmentsByDate', getAppointmentsByDateController);
app.get('/getAllUserAndAppointments', getAllUserAndAppointmentsController);

app.post('/g2/info', newInfoController);
app.post('/g/updateData', updateLicenseDataController);
app.post('/users/register', registerController);
app.post('/user/login', userLoginController);
app.post('/appointments/create', createAppointmentController);
app.post('/bookG2Appointment', bookG2AppointmentController);
app.post('/bookGAppointment', bookGAppointmentController);
app.post('/updateTestDetails', updateTestDetailsController);
