const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // FIXME: disallw cors in production

app.use(cors()); // FIXME: disallw cors in production
app.use(bodyParser.json())

app.use('/static', express.static('static'));


app.get('/api/events', (req, res) => {
  const highlights = [
    {title:'滑铁卢本地新生会', content: '为期一周的Orientation接近尾声，WATER WATER WATER，LOO LOO LOO!!! 的呐喊声里，有找到一起玩耍的小伙伴吗？有遇见男神／女神吗？有撞上柱子一样粗壮的大腿吗？如果你的答案是NO的话，不要担心，9月20号和UWCSSA在2015校园新生会上一起嗨起来吧！', link: 'https://google.com', pic: '/static/dummy.jpg', highlight: true},
    {title:'Title', content: 'Content', link: 'https://google.com', pic: '/static/dummy.jpg', highlight: true},
    {title:'Title', content: 'Content', link: 'https://google.com', pic: '/static/dummy.jpg', highlight: true},
    {title:'Title', content: 'Content', link: 'https://google.com', pic: '/static/dummy.jpg', highlight: false}
  ];
  res.send(highlights);
});

app.post('/api/contact/message', (req, res) => {
  console.log(req.body);
  setTimeout(() => {
    res.send({ success: true });
  }, 2000)
  
})

app.use(express.static('client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('Listening on ' + PORT);
});