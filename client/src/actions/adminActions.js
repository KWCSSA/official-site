import axios from 'axios';

import { USER_LOGIN, FETCH_EVENT } from '../TYPES';

export const adminLogin = password => async dispatch => {
  // const res = await axios.post('/api/admin/login', password); // FIXME: use real api
  const res = await axios.post('http://localhost:8080/api/login', { password });

  dispatch({ type: USER_LOGIN, payload: res.data });
}

export const updateEventList = events => async dispatch => {
  // const res = await axios.post('/api/admin/event/list', events); // FIXME: use real api
  // dispatch({ type: FETCH_EVENT, payload: res.data });
  console.log(events);
  dispatch({type: 'null'});
}

export const updateEventDetail = event => async dispatch => {
  var res = null;
  if (event.fileChanged) {
    const fileData = new FormData();
    fileData.append('newImage', event.file);
    // res = await axios.post('/api/admin/event/detail/image', fileData); // FIXME: use real api
    res = await axios.post('http://localhost:8080/api/admin/event/detail/image', fileData); // FIXME: use real api
  }
  // res = await axios.post('/api/admin/event/detail', event); // FIXME: use real api
  res = await axios.post('http://localhost:8080/api/admin/event/detail', event); // FIXME: use real api
  dispatch({type: 'null'});
}