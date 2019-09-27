const path = require('path');
const fs = require('fs');

const eventDataFilePath = path.join(__dirname, '../data/event/events.json');

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
    var fileType = newImage.name.split('.');
    var fileName = `${targetId}.jpg`;
    var dirName = path.join(__dirname, '../static/eventPics');
    newImage.mv(path.join(dirName, fileName));
    console.log(path.join(dirName, fileName));
    // fs.createReadStream(path.join(dirName, fileName)).pipe(fs.createWriteStream(path.join(__dirname, '../static/dummy.jpg')));
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

  app.get('/api/admin/event/list', async (req, res) => {
    var eventList = JSON.parse(await fs.readFileSync(eventDataFilePath));
    res.send(eventList);
  });

  app.put('/api/admin/event/list', async (req, res) => {
    var eventList = JSON.parse(await fs.readFileSync(eventDataFilePath));
    var updatedList = req.body;
    console.log(updatedList.length, eventList.length);
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

    var filePath = path.join(__dirname, `../static/eventPics/${targetId}.jpg`);
    try {
      var tempFile = fs.openSync(filePath, 'r');
      fs.closeSync(tempFile);
      fs.unlinkSync(filePath);
    } catch (err) {}
    
    var updatedList = eventList.filter(event => event.id !== targetId);
    await fs.writeFileSync(eventDataFilePath, JSON.stringify(updatedList));
    res.send(updatedList);
  });
};