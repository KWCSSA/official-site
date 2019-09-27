const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR_KEY);
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

module.exports = app => {
  app.use(fileUpload());

  app.post('/api/admin/login', (req, res) => {
    var password = req.body.password;
    if (password === cryptr.decrypt(process.env.ADMIN_PASSWORD)) {
      return res.send(true);
    } else {
      return res.send(false);
    }
  });

  require('./adminEventRoutes')(app);
};