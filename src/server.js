require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const clients = require('./routes/clientRoutes');
const accountTypes = require('./routes/accountTypeRoutes');
const consultants = require('./routes/consultantRoutes');
const managers = require('./routes/managerRoutes');
const admins = require('./routes/adminRoutes');
const organizations = require('./routes/organizationRoutes');
const userLogin = require('./routes/authentication/userAuth');
const blogPosts = require('./routes/blogPostRoutes');
const orphans = require('./routes/orphanRoutes');
const volunteeringEvents = require('./routes/volunteeringEventRoutes');
const proceedings = require('./routes/proceedingRoutes');
const transactions = require('./routes/transactionRoutes');
const docUploads = require('./routes/docUploadRoutes');
const imgUploads = require('./routes/imgUploadRoutes');
const users = require('./routes/userRoutes');


// intialization
const app = express();

// verify intialization of private key
/**
 * defined private key using environment variables inside '.env' file
 */
if(!process.env.JWT_PRIVATE_KEY){
    console.error('FATAL ERROR: Private key not defined!');
    process.exit(1);
}

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connecting to database...');
        console.log('connected to mongodb...');
    }).catch(err => console.error('failed to connect to database...'));

// start backend server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// dev testing - cross origin resource sharing (cors)
const cors = require('cors');
app.use(cors({exposedHeaders: 'x-auth-token, x-user-type'}));

// middlewares
app.use(express.json());

// middlewares - api endpoints
app.use('/api/users', users);
app.use('/api/admins', admins);
app.use('/api/orphans', orphans);
app.use('/api/clients', clients);
app.use('/api/managers', managers);
app.use('/api/blogPosts', blogPosts);
app.use('/api/docUploads', docUploads);
app.use('/api/imgUploads', imgUploads);
app.use('/api/clientAuth', userLogin);
app.use('/api/proceedings', proceedings);
app.use('/api/consultants', consultants);
app.use('/api/transactions', transactions);
app.use('/api/accountTypes', accountTypes);
app.use('/api/organizations', organizations);
app.use('/api/volunteeringEvents', volunteeringEvents);

/** TODO: 
 * 
 */

 module.exports = app;