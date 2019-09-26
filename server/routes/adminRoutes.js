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

  app.post('/api/admin/event/detail', (req, res) => {
    // console.log(req.body);

    res.send('200');
  });

  app.post('/api/admin/event/detail/image', (req, res) => {
    var newImage = req.files.newImage;
    var fileType = newImage.name.split('.');
    fileType = `${fileType[fileType.length - 1]}`.toLowerCase();
    var fileName = `${Date.now()}.${fileType}`;
    var dirName = path.join(__dirname, '../data/image');
    newImage.mv(path.join(dirName, fileName));
    console.log(path.join(dirName, fileName));
    // fs.copyFileSync(path.join(dirName, fileName), path.join(dirName, 'test'));
    fs.createReadStream(path.join(dirName, fileName)).pipe(fs.createWriteStream(path.join(__dirname, '../static/dummy.jpg')));

    // how to delete file
    // var filename = path.join(__dirname, '../data/image/new1569476369797.jpg');
    // var tempFile = fs.openSync(filename, 'r');
    // fs.closeSync(tempFile);
    // fs.unlinkSync(filename);

    res.send('200');
  });
};