const fs = require('fs');
const path = require('path');

const aboutDataFilePath = path.join(__dirname, '../data/about.json');

module.exports = app => {
  app.get('/api/about', async (req, res) => {
    const aboutPeople = JSON.parse(await fs.readFileSync(aboutDataFilePath));
    const data = {
      people: aboutPeople,
      photo: `http://localhost:8080/static/about-group-photo.jpg?${Date.now()}`
    }
    res.send(data);
  });
};
