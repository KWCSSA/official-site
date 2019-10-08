const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
// const ipfilter = require('express-ipfilter');
const cors = require('cors'); // FIXME: disallow cors in production
app.use(cors());
require('dotenv').config();

app.use(bodyParser.json());

app.use('/static', express.static('static'));

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

// Handle admin routes
require('./routes/admin/adminRoutes')(app);

app.use(express.static('client/build'));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log('Listening on ' + PORT);
});
