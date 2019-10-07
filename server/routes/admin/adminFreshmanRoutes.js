const path = require('path');
const fs = require('fs');

const freshmanDataFilePath = path.join(__dirname, '../../data/freshman.json');

module.exports = app => {
  app.put('/api/admin/freshman/message', async (req, res) => {
    var freshman = JSON.parse(await fs.readFileSync(freshmanDataFilePath));
    freshman.message = req.body.message;
    freshman.date = req.body.date;
    await fs.writeFileSync(freshmanDataFilePath, JSON.stringify(freshman));
    res.send(freshman);
  });

  app.put('/api/admin/freshman/booklets', async (req, res) => {
    var freshman = JSON.parse(await fs.readFileSync(freshmanDataFilePath));
    var dirName = path.join(__dirname, '../../static/freshmanBooklets');
    if (req.files.NSPic) {
      var fileName = 'new-student-booklet-cover.jpg';
      await req.files.NSPic.mv(path.join(dirName, fileName));
      freshman.newStudentBooklet.pic = `http://localhost:8080/static/freshmanBooklets/new-student-booklet-cover.jpg?${Date.now()}`;
    }
    if (req.files.NSPdf) {
      var fileName = 'new-student-booklet.pdf';
      req.files.NSPdf.mv(path.join(dirName, fileName));
      freshman.newStudentBooklet.link = `http://localhost:8080/static/freshmanBooklets/new-student-booklet.pdf?${Date.now()}`;
    }
    if (req.files.SFPic) {
      var fileName = 'safety-booklet-cover.jpg';
      req.files.SFPic.mv(path.join(dirName, fileName));
      freshman.safetyBooklet.pic = `http://localhost:8080/static/freshmanBooklets/safety-booklet-cover.jpg?${Date.now()}`;
    }
    if (req.files.SFPdf) {
      var fileName = 'safety-booklet.pdf';
      req.files.SFPdf.mv(path.join(dirName, fileName));
      freshman.safetyBooklet.link = `http://localhost:8080/static/freshmanBooklets/safety-booklet.pdf?${Date.now()}`;
    }
    await fs.writeFileSync(freshmanDataFilePath, JSON.stringify(freshman));
    res.send(freshman);
  });
};