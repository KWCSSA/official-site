import axios from 'axios';
import { reset } from 'redux-form';

import * as TYPES from '../TYPES'

export * from './adminActions';

const serverAddress = 'http://localhost:8080'; //FIXME use real api

export const fetchHome = () => async dispatch => {
  const res = await axios.get(`${serverAddress}/api/home`);
  dispatch({ type: TYPES.FETCH_HOME, payload: res.data });
}

export const fetchEvent = () => async dispatch => {
  const eventRes = await axios.get(`${serverAddress}/api/event/list`);
  const bannerRes = await axios.get(`${serverAddress}/api/event/banners`);
  const payload = {
    events: eventRes.data,
    banners: bannerRes.data
  }
  dispatch({ type: TYPES.FETCH_EVENT, payload });
};

export const fetchAbout = () => async dispatch => {
  const res = await axios.get(`${serverAddress}/api/about`);
  
  dispatch({ type: TYPES.FETCH_ABOUT, payload: res.data });
}

export const fetchFreshman = () => async dispatch => {
  const res = await axios.get(`${serverAddress}/api/freshman`);
  
  dispatch({ type: TYPES.FETCH_FRESHMAN, payload: res.data });
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