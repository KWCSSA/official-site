const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // FIXME: disallw cors in production
require('dotenv').config();

app.use(cors()); // FIXME: disallw cors in production
app.use(bodyParser.json())

app.use('/static', express.static('static'));


// Handle event routes
require('./routes/eventRoutes')(app);

// Handle about routes
require('./routes/aboutRoutes')(app);

// Handle contact routes
require('./routes/contactRoutes')(app);

// Handle admin routes
require('./routes/adminRoutes')(app);

app.use(express.static('client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('Listening on ' + PORT);
});
