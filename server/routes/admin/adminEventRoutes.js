const path = require('path');
const fs = require('fs');

const eventDataFilePath = path.join(__dirname, '../../data/events.json');
const bannerDataFilePath = path.join(__dirname, '../../data/eventBanners.json');

module.exports = app => {
  app.put('/api/admin/event/detail/:eventId', async (req, res) => {
    const targetId = req.params.eventId;
    const updatedEvent = req.body;
    var eventList = JSON.parse(await fs.readFileSync(eventDataFilePath));
    var updatedList = eventList.map(event => {
      if (event.id === targetId) {
        event.title = updatedEvent.title;
        event.content = updatedEvent.content;
        event.link = updatedEvent.link;
        event.highlight = updatedEvent.highlight;
      }
      return event;
    });
    await fs.writeFileSync(eventDataFilePath, JSON.stringify(updatedList));
    res.send(updatedList);
  });

  app.put('/api/admin/event/detail/image/:eventId', async (req, res) => {
    const targetId = req.params.eventId;
    if (!req.files) {
      var eventList = JSON.parse(await fs.readFileSync(eventDataFilePath));
      return res.send(eventList);
    }
    var newImage = req.files.newImage;
    var fileName = `${targetId}.jpg`;
    var dirName = path.join(__dirname, '../../static/eventPics');
    newImage.mv(path.join(dirName, fileName));
    console.log(path.join(dirName, fileName));
    var eventList = JSON.parse(await fs.readFileSync(eventDataFilePath));
    var updatedList = eventList.map(event => {
      if (event.id === targetId) {
        event.pic = `http://localhost:8080/static/eventPics/${fileName}?${Date.now()}`;
      }
      return event;
    });
    await fs.writeFileSync(eventDataFilePath, JSON.stringify(updatedList));
    res.send(updatedList);
  });

  app.put('/api/admin/event/list', async (req, res) => {
    var updatedList = req.body;
    await fs.writeFileSync(eventDataFilePath, JSON.stringify(updatedList));
    res.send(updatedList);
  });

  app.post('/api/admin/event/new', async (req, res) => {
    var eventList = await fs.readFileSync(eventDataFilePath);
    try {
      eventList = JSON.parse(eventList);
    } catch (err) {
      eventList = []
    }
    var newEventId = `event${Date.now()}`;
    var newEvent = {
      id: newEventId,
      title: req.body.title,
      content: req.body.content,
      link: req.body.link,
      highlight: req.body.highlight,
      pic: ''
    }
    eventList.unshift(newEvent);
    await fs.writeFileSync(eventDataFilePath, JSON.stringify(eventList));
    res.send(newEventId);
  });

  app.delete('/api/admin/event/delete/:eventId', async (req, res) => {
    var eventList = JSON.parse(await fs.readFileSync(eventDataFilePath));
    var targetId = req.params.eventId;

    var filePath = path.join(__dirname, `../../static/eventPics/${targetId}.jpg`);
    try {
      var tempFile = fs.openSync(filePath, 'r');
      fs.closeSync(tempFile);
      fs.unlinkSync(filePath);
    } catch (err) {}
    
    var updatedList = eventList.filter(event => event.id !== targetId);
    await fs.writeFileSync(eventDataFilePath, JSON.stringify(updatedList));
    res.send(updatedList);
  });
  

  // banner routes
  app.post('/api/admin/event/banner/new', async (req, res) => {
    var banners = await fs.readFileSync(bannerDataFilePath);
    try {
      banners = JSON.parse(banners);
    } catch (err) {
      banners = []
    }
    var newBannerId = `eventBanner${Date.now()}`;
    var newBanner = {
      id: newBannerId,
      link: req.body.link,
      pic: ''
    }
    banners.unshift(newBanner);
    await fs.writeFileSync(bannerDataFilePath, JSON.stringify(banners));
    res.send(newBannerId);
  });

  app.put('/api/admin/event/banner/detail/:bannerId', async (req, res) => {
    const targetId = req.params.bannerId;
    const updatedBanner = req.body;
    var banners = JSON.parse(await fs.readFileSync(bannerDataFilePath));
    var updatedList = banners.map(banner => {
      if (banner.id === targetId) {
        banner.link = updatedBanner.link;
      }
      return banner;
    });
    await fs.writeFileSync(bannerDataFilePath, JSON.stringify(updatedList));
    res.send(updatedList);
  });

  app.put('/api/admin/event/banner/detail/image/:bannerId', async (req, res) => {
    const targetId = req.params.bannerId;
    if (!req.files) {
      var banners = JSON.parse(await fs.readFileSync(bannerDataFilePath));
      return res.send(banners);
    }
    var newImage = req.files.newImage;
    var fileName = `${targetId}.jpg`;
    var dirName = path.join(__dirname, '../../static/eventPics/banners');
    newImage.mv(path.join(dirName, fileName));
    console.log(path.join(dirName, fileName));
    var banners = JSON.parse(await fs.readFileSync(bannerDataFilePath));
    var updatedList = banners.map(banner => {
      if (banner.id === targetId) {
        banner.pic = `http://localhost:8080/static/eventPics/banners/${fileName}?${Date.now()}`;
      }
      return banner;
    });
    await fs.writeFileSync(bannerDataFilePath, JSON.stringify(updatedList));
    res.send(updatedList);
  });

  app.delete('/api/admin/event/banner/delete/:bannerId', async (req, res) => {
    var banners = JSON.parse(await fs.readFileSync(bannerDataFilePath));
    var targetId = req.params.bannerId;

    var filePath = path.join(__dirname, `../../static/eventPics/banners/${targetId}.jpg`);
    try {
      var tempFile = fs.openSync(filePath, 'r');
      fs.closeSync(tempFile);
      fs.unlinkSync(filePath);
    } catch (err) {}
    
    var updatedList = banners.filter(banner => banner.id !== targetId);
    await fs.writeFileSync(bannerDataFilePath, JSON.stringify(updatedList));
    res.send(updatedList);
  });
};