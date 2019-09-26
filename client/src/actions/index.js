import axios from 'axios';
import { reset } from 'redux-form';

import * as TYPES from '../TYPES'

export * from './adminActions';

export const fetchEvent = () => async dispatch => {
  // const res = await axios.get('/api/events'); FIXME: change to real api call
  const res = {
    data: [
      { id: 1, title: '滑铁卢本地新生会', content: '为期一周的Orientation接近尾声，WATER WATER WATER，LOO LOO LOO!!! 的呐喊声里，有找到一起玩耍的小伙伴吗？有遇见男神／女神吗？有撞上柱子一样粗壮的大腿吗？如果你的答案是NO的话，不要担心，9月20号和UWCSSA在2015校园新生会上一起嗨起来吧！', link: 'https://google.com', pic: 'http://localhost:8080/static/dummy.jpg', highlight: true },
      { id: 2, title: 'Title', content: 'Content', link: 'https://google.com', pic: 'http://localhost:8080/static/dummy.jpg', highlight: true },
      { id: 3, title: 'Title', content: 'Content', link: 'https://google.com', pic: 'http://localhost:8080/static/dummy.jpg', highlight: true },
      { id: 4, title: 'Title', content: 'Content', link: 'https://google.com', pic: 'http://localhost:8080/static/dummy.jpg', highlight: false }
    ]
  }
  dispatch({ type: TYPES.FETCH_EVENT, payload: res.data });
};

export const fetchAbout = () => async dispatch => {
  // const res = await axios.get('/api/about'); FIXME: change to real api call
  const res = {
    data: [
      { id: 1, position: '主席', name: '赵铁柱', pic: 'http://localhost:8080/static/flavio.jpg', description: '外联部的主体职责分为两部分。一是负责筹集KWCSSA的所有日常与大型活动经费，如迎新会、好声音、滑大春晚，与赞助商进行沟通签约。我们现有的赞助商已有东方航空，RezOne，奔驰等。一般每位赞助商由外联部两部员以一主一副形势跟进。负责前期的proposal提出，中期的沟通协商以及后期的签约和收集反馈。' },
      { id: 2, position: '主席', name: '赵铁柱', pic: 'http://localhost:8080/static/flavio.jpg', description: '外联部的主体职责分为两部分。一是负责筹集KWCSSA的所有日常与大型活动经费，如迎新会、好声音、滑大春晚，与赞助商进行沟通签约。我们现有的赞助商已有东方航空，RezOne，奔驰等。一般每位赞助商由外联部两部员以一主一副形势跟进。负责前期的proposal提出，中期的沟通协商以及后期的签约和收集反馈。' },
      { id: 3, position: '主席', name: '赵铁柱', pic: 'http://localhost:8080/static/flavio.jpg', description: '外联部的主体职责分为两部分。一是负责筹集KWCSSA的所有日常与大型活动经费，如迎新会、好声音、滑大春晚，与赞助商进行沟通签约。我们现有的赞助商已有东方航空，RezOne，奔驰等。一般每位赞助商由外联部两部员以一主一副形势跟进。负责前期的proposal提出，中期的沟通协商以及后期的签约和收集反馈。' },
      { id: 4, position: '主席', name: '赵铁柱', pic: 'http://localhost:8080/static/flavio.jpg', description: '外联部的主体职责分为两部分。一是负责筹集KWCSSA的所有日常与大型活动经费，如迎新会、好声音、滑大春晚，与赞助商进行沟通签约。我们现有的赞助商已有东方航空，RezOne，奔驰等。一般每位赞助商由外联部两部员以一主一副形势跟进。负责前期的proposal提出，中期的沟通协商以及后期的签约和收集反馈。' },
      { id: 5, position: '主席', name: '赵铁柱', pic: 'http://localhost:8080/static/flavio.jpg', description: '外联部的主体职责分为两部分。一是负责筹集KWCSSA的所有日常与大型活动经费，如迎新会、好声音、滑大春晚，与赞助商进行沟通签约。我们现有的赞助商已有东方航空，RezOne，奔驰等。一般每位赞助商由外联部两部员以一主一副形势跟进。负责前期的proposal提出，中期的沟通协商以及后期的签约和收集反馈。' },
      { id: 6, position: '主席', name: '赵铁柱', pic: 'http://localhost:8080/static/flavio.jpg', description: '外联部的主体职责分为两部分。一是负责筹集KWCSSA的所有日常与大型活动经费，如迎新会、好声音、滑大春晚，与赞助商进行沟通签约。我们现有的赞助商已有东方航空，RezOne，奔驰等。一般每位赞助商由外联部两部员以一主一副形势跟进。负责前期的proposal提出，中期的沟通协商以及后期的签约和收集反馈。' }
    ]
  };
  dispatch({ type: TYPES.FETCH_ABOUT, payload: res.data });
}

export const sendMessageLoading = () => ({ type: TYPES.SEND_MESSAGE_LOADING });

export const sendMessage = message => async dispatch => {
  // const res = await axios.post('/api/contact/message', message); //FIXME: change to real api call
  const res = {
    data: {
      success: true
    }
  };
  dispatch({ type: TYPES.SEND_MESSAGE, payload: res.data });
}

export const clearMessageStatus = () => ({ type: TYPES.CLEAR_MESSAGE });

export const clearContactForm = () => async dispatch => {
  dispatch(reset('contactForm'));
}