const fs = require('fs');
const path = require('path');

const eventDataFilePath = path.join(__dirname, '../data/events.json');

module.exports = app => {
  app.get('/api/event/list', async (req, res) => {
    var eventList = JSON.parse(await fs.readFileSync(eventDataFilePath));
    res.send(eventList);
  });
};
