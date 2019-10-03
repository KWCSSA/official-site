const fs = require('fs');
const path = require('path');

const eventDataFilePath = path.join(__dirname, '../data/events.json');
const bannerDataFilePath = path.join(__dirname, '../data/eventBanners.json');

module.exports = app => {
  app.get('/api/event/list', async (req, res) => {
    var eventList = JSON.parse(await fs.readFileSync(eventDataFilePath));
    res.send(eventList);
  });

  app.get('/api/event/banners', async (req, res) => {
    var banners = JSON.parse(await fs.readFileSync(bannerDataFilePath));
    res.send(banners);
  });
};
