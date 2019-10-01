const fs = require('fs');
const path = require('path');

const aboutDataFilePath = path.join(__dirname, '../data/about.json');

module.exports = app => {
  app.get('/api/about', async (req, res) => {
    const data = JSON.parse(await fs.readFileSync(aboutDataFilePath));
    res.send(data);
  });
};
