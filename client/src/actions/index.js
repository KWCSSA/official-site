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
  const res = await axios.get(`${serverAddress}/api/about`);
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

export const fetchFreshman = () => async dispatch => {
  // const res = await axios.get(`${serverAddress}/api/freshman`);
  var res = {
    data: {
      message: '滑铁卢基奇纳学生学者联谊会（简称KWCSSA），是KW地区唯一由中国驻多伦多领事馆认证的非营利性组织。 滑铁卢目前有超过一万位的中国学生学者，KWCSSA的宗旨是希望通过举办各类娱乐活动、学术活动以及交流活动，缓解大家的压力丰富大家的课余生活。 KWCSSA还拥有全加拿大最大的非营利性学生论坛-滑大论坛，滑大论坛有超过15万的注册会员，近四百万的总发帖量，是在KW地区生活的必备神器。',
      date: '2019年9月1日'
    }
  }

  dispatch({ type: TYPES.FETCH_FRESHMAN, payload: res.data });
}