const mongoose = require('mongoose');

// Import environmental variables from our variables.env file
require('dotenv').config({
    path: 'variables.env'
});

// Connect to mongo
process.env.NODE_ENV === 'production' ? mongoose.connect(process.env.DATABASE_PROD, {useNewUrlParser: true}) : mongoose.connect(process.env.DATABASE_DEV, {useNewUrlParser: true});

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
    console.error(err.message);
});

// Import all of our models
require('./models/Course');
require('./models/User');
require('./models/Review');

// Start our app
const app = require('./app');
app.set('port', process.env.PORT || 8080);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running on PORT ${server.address().port}`);
});