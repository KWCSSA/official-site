const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
require('dotenv').config();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static('static'));

// Handle admin routes
require('./routes/admin/adminRoutes')(app);

// Handle home routes
require('./routes/homeRoutes')(app);

// Handle event routes
require('./routes/eventRoutes')(app);

// Handle freshman routes
require('./routes/freshmanRoutes')(app);

// Handle about routes
require('./routes/aboutRoutes')(app);

// Handle contact routes
require('./routes/contactRoutes')(app);

app.use(express.static('client/build'));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log('Listening on ' + PORT);
});
