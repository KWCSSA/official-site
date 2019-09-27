import axios from 'axios';

import { USER_LOGIN, FETCH_EVENT } from '../TYPES';

const serverAddress = 'http://localhost:8080'; //FIXME use real api

export const adminLogin = password => async dispatch => {
  const res = await axios.post(`${serverAddress}/api/login`, { password });

  dispatch({ type: USER_LOGIN, payload: res.data });
}

export const updateEventList = events => dispatch => {
  axios.put(`${serverAddress}/api/admin/event/list`, events);
  dispatch({ type: FETCH_EVENT, payload: events });
}

export const updateEventDetail = event => async dispatch => {
  var res = null;
  if (event.fileChanged) {
    var fileData = new FormData();
    fileData.append('newImage', event.file);
    res = await axios.put(`${serverAddress}/api/admin/event/detail/image/${event.id}`, fileData);
  }
  res = await axios.put(`${serverAddress}/api/admin/event/detail/${event.id}`, event);
  dispatch({ type: FETCH_EVENT, payload: res.data });
}

export const addNewEvent = event => async dispatch => {
  var res = null;
  var fileData = new FormData();
  fileData.append('newImage', event.file);
  res = await axios.post(`${serverAddress}/api/admin/event/new`, event);
  res = await axios.put(`${serverAddress}/api/admin/event/detail/image/${res.data}`, fileData);
  dispatch({ type: FETCH_EVENT, payload: res.data });
}

export const deleteEvent = id => async dispatch => {
  const res = await axios.delete(`${serverAddress}/api/admin/event/delete/${id}`);
  dispatch({ type: FETCH_EVENT, payload: res.data });
}