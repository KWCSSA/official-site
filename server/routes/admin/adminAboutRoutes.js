const path = require('path');
const fs = require('fs');

const aboutDataFilePath = path.join(__dirname, '../../data/about.json');

module.exports = app => {
  app.put('/api/admin/about/list', async (req, res) => {
    var updatedList = req.body;
    await fs.writeFileSync(aboutDataFilePath, JSON.stringify(updatedList));
    res.send(updatedList);
  });

  app.put('/api/admin/about/detail/:personId', async (req, res) => {
    const targetId = req.params.personId;
    const updatedPerson = req.body;
    var aboutData = JSON.parse(await fs.readFileSync(aboutDataFilePath));
    var updatedList = aboutData.people.map(person => {
      if (person.id === targetId) {
        person.name = updatedPerson.name;
        person.position = updatedPerson.position;
        person.description = updatedPerson.description;
      }
      return person;
    });
    aboutData.people = updatedList;
    await fs.writeFileSync(aboutDataFilePath, JSON.stringify(aboutData));
    res.send(aboutData);
  });

  app.put('/api/admin/about/detail/image/:personId', async (req, res) => {
    const targetId = req.params.personId;
    if (!req.files) {
      var aboutData = JSON.parse(await fs.readFileSync(aboutDataFilePath));
      return res.send(aboutData);
    }
    var newImage = req.files.newImage;
    var fileName = `${targetId}.jpg`;
    var dirName = path.join(__dirname, '../../static/aboutPics');
    newImage.mv(path.join(dirName, fileName));
    console.log(path.join(dirName, fileName));
    var aboutData = JSON.parse(await fs.readFileSync(aboutDataFilePath));
    var updatedList = aboutData.people.map(person => {
      if (person.id === targetId) {
        person.pic = `http://localhost:8080/static/aboutPics/${fileName}?${Date.now()}`;
      }
      return person;
    });
    aboutData.people = updatedList;
    await fs.writeFileSync(aboutDataFilePath, JSON.stringify(aboutData));
    res.send(aboutData);
  });

  app.post('/api/admin/about/new', async (req, res) => {
    var aboutData = JSON.parse(await fs.readFileSync(aboutDataFilePath));
    var newPersonId = `person${Date.now()}`;
    var newPerson = {
      id: newPersonId,
      name: req.body.name,
      position: req.body.position,
      description: req.body.description,
      pic: ''
    }
    aboutData.people.unshift(newPerson);
    await fs.writeFileSync(aboutDataFilePath, JSON.stringify(aboutData));
    res.send(newPersonId);
  });

  app.delete('/api/admin/about/delete/:personId', async (req, res) => {
    var aboutData = JSON.parse(await fs.readFileSync(aboutDataFilePath));
    var targetId = req.params.personId;

    var filePath = path.join(__dirname, `../../static/aboutPics/${targetId}.jpg`);
    try {
      var tempFile = fs.openSync(filePath, 'r');
      fs.closeSync(tempFile);
      fs.unlinkSync(filePath);
    } catch (err) {}
    
    aboutData.people = aboutData.people.filter(person => person.id !== targetId);
    await fs.writeFileSync(aboutDataFilePath, JSON.stringify(aboutData));
    res.send(aboutData);
  });

  app.put('/api/admin/about/photo', async (req, res) => {
    var fileName = 'about-group-photo.jpg';
    var dirName = path.join(__dirname, '../../static');
    if (!req.files) {
      return res.send(`http://localhost:8080/static/${fileName}?${Date.now()}`);
    }
    var newImage = req.files.newImage;
    newImage.mv(path.join(dirName, fileName));
    console.log(path.join(dirName, fileName));
    res.send(`http://localhost:8080/static/${fileName}?${Date.now()}`);
  });
}