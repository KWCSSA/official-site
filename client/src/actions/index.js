import axios from 'axios';
import { reset } from 'redux-form';

import * as TYPES from '../TYPES'

export * from './adminActions';

const serverAddress = 'http://localhost:8080'; //FIXME use real api

export const fetchHome = () => async dispatch =>{
  const res = await axios.get(`${serverAddress}/api/home`);
  dispatch({ type: TYPES.FETCH_HOME, payload: res.data });
}

export const fetchEvent = () => async dispatch => {
  const res = await axios.get(`${serverAddress}/api/event/list`);
  dispatch({ type: TYPES.FETCH_EVENT, payload: res.data });
};

export const fetchAbout = () => async dispatch => {
  // const res = await axios.get('/api/about'); FIXME: change to real api call
  const res = {
    data: [
      { id: 1, position: '主席', name: '赵铁柱', pic: `${serverAddress}/static/flavio.jpg`, description: '外联部的主体职责分为两部分。一是负责筹集KWCSSA的所有日常与大型活动经费，如迎新会、好声音、滑大春晚，与赞助商进行沟通签约。我们现有的赞助商已有东方航空，RezOne，奔驰等。一般每位赞助商由外联部两部员以一主一副形势跟进。负责前期的proposal提出，中期的沟通协商以及后期的签约和收集反馈。' },
      { id: 2, position: '主席', name: '赵铁柱', pic: `${serverAddress}/static/flavio.jpg`, description: '外联部的主体职责分为两部分。一是负责筹集KWCSSA的所有日常与大型活动经费，如迎新会、好声音、滑大春晚，与赞助商进行沟通签约。我们现有的赞助商已有东方航空，RezOne，奔驰等。一般每位赞助商由外联部两部员以一主一副形势跟进。负责前期的proposal提出，中期的沟通协商以及后期的签约和收集反馈。' },
      { id: 3, position: '主席', name: '赵铁柱', pic: `${serverAddress}/static/flavio.jpg`, description: '外联部的主体职责分为两部分。一是负责筹集KWCSSA的所有日常与大型活动经费，如迎新会、好声音、滑大春晚，与赞助商进行沟通签约。我们现有的赞助商已有东方航空，RezOne，奔驰等。一般每位赞助商由外联部两部员以一主一副形势跟进。负责前期的proposal提出，中期的沟通协商以及后期的签约和收集反馈。' },
      { id: 4, position: '主席', name: '赵铁柱', pic: `${serverAddress}/static/flavio.jpg`, description: '外联部的主体职责分为两部分。一是负责筹集KWCSSA的所有日常与大型活动经费，如迎新会、好声音、滑大春晚，与赞助商进行沟通签约。我们现有的赞助商已有东方航空，RezOne，奔驰等。一般每位赞助商由外联部两部员以一主一副形势跟进。负责前期的proposal提出，中期的沟通协商以及后期的签约和收集反馈。' },
      { id: 5, position: '主席', name: '赵铁柱', pic: `${serverAddress}/static/flavio.jpg`, description: '外联部的主体职责分为两部分。一是负责筹集KWCSSA的所有日常与大型活动经费，如迎新会、好声音、滑大春晚，与赞助商进行沟通签约。我们现有的赞助商已有东方航空，RezOne，奔驰等。一般每位赞助商由外联部两部员以一主一副形势跟进。负责前期的proposal提出，中期的沟通协商以及后期的签约和收集反馈。' },
      { id: 6, position: '主席', name: '赵铁柱', pic: `${serverAddress}/static/flavio.jpg`, description: '外联部的主体职责分为两部分。一是负责筹集KWCSSA的所有日常与大型活动经费，如迎新会、好声音、滑大春晚，与赞助商进行沟通签约。我们现有的赞助商已有东方航空，RezOne，奔驰等。一般每位赞助商由外联部两部员以一主一副形势跟进。负责前期的proposal提出，中期的沟通协商以及后期的签约和收集反馈。' }
    ]
  };
  dispatch({ type: TYPES.FETCH_ABOUT, payload: res.data });
}

export const sendMessageLoading = () => ({ type: TYPES.SEND_MESSAGE_LOADING });

export const sendMessage = message => async dispatch => {
  // const res = await axios.post(`${serverAddress}/api/contact/message`, message); //FIXME: change to real api call
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