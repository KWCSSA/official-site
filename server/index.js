const express = require('express');
const app = express();
const cors = require('cors'); // FIXME: disallw cors in production

app.use(cors()); // FIXME: disallw cors in production

app.use('/static', express.static('static'));

app.get('/', (req, res) => {
  res.send({connection: 'ok'});
});

app.get('/api/highlight', (req, res) => {
  const highlights = [
    {title:'滑铁卢本地新生会', content: '为期一周的Orientation接近尾声，WATER WATER WATER，LOO LOO LOO!!! 的呐喊声里，有找到一起玩耍的小伙伴吗？有遇见男神／女神吗？有撞上柱子一样粗壮的大腿吗？如果你的答案是NO的话，不要担心，9月20号和UWCSSA在2015校园新生会上一起嗨起来吧！', link: 'https://google.com', pic: '/static/dummy.jpg'},
    {title:'Title', content: 'Content', link: 'https://google.com', pic: '/static/dummy.jpg'},
    {title:'Title', content: 'Content', link: 'https://google.com', pic: '/static/dummy.jpg'}
  ];
  res.send(highlights);
});


const PORT = process.env.PORT || 8080;

app.listen(PORT);