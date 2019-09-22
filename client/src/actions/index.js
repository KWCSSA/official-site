import axios from 'axios';
import { FETCH_EVENT } from '../TYPES'

export const fetchEvent = () => async dispatch => {
  // const res = await axios.get('/api/events');
  const res = {
    data: [
      { title: '滑铁卢本地新生会', content: '为期一周的Orientation接近尾声，WATER WATER WATER，LOO LOO LOO!!! 的呐喊声里，有找到一起玩耍的小伙伴吗？有遇见男神／女神吗？有撞上柱子一样粗壮的大腿吗？如果你的答案是NO的话，不要担心，9月20号和UWCSSA在2015校园新生会上一起嗨起来吧！', link: 'https://google.com', pic: 'http://localhost:8080/static/dummy.jpg', highlight: true },
      { title: 'Title', content: 'Content', link: 'https://google.com', pic: 'http://localhost:8080/static/dummy.jpg', highlight: true },
      { title: 'Title', content: 'Content', link: 'https://google.com', pic: 'http://localhost:8080/static/dummy.jpg', highlight: true },
      { title: 'Title', content: 'Content', link: 'https://google.com', pic: 'http://localhost:8080/static/dummy.jpg', highlight: false }
    ]
  }
  dispatch({ type: FETCH_EVENT, payload: res.data });
};