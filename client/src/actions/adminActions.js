import axios from 'axios';

import { USER_LOGIN, FETCH_EVENT, FETCH_HOME, FETCH_ABOUT } from '../TYPES';

const serverAddress = 'http://localhost:8080'; //FIXME use real api

export const adminLogin = password => async dispatch => {
  const res = await axios.post(`${serverAddress}/api/login`, { password });

  dispatch({ type: USER_LOGIN, payload: res.data });
}

// Action for home section
export const updateHome = home => async dispatch => {
  const res = await axios.put(`${serverAddress}/api/admin/home`, home);

  dispatch({ type: FETCH_HOME, payload: res.data });
}

// Actions for events section
export const updateEventList = events => async dispatch => {
  axios.put(`${serverAddress}/api/admin/event/list`, events);
  const bannerRes = await axios.get(`${serverAddress}/api/event/banners`);
  const payload = {
    events,
    banners: bannerRes.data
  }

  dispatch({ type: FETCH_EVENT, payload });
}

export const updateEventDetail = event => async dispatch => {
  var res = null;
  if (event.fileChanged) {
    var fileData = new FormData();
    fileData.append('newImage', event.file);
    res = await axios.put(`${serverAddress}/api/admin/event/detail/image/${event.id}`, fileData);
  }
  res = await axios.put(`${serverAddress}/api/admin/event/detail/${event.id}`, event);

  const bannerRes = await axios.get(`${serverAddress}/api/event/banners`);
  const payload = {
    events: res.data,
    banners: bannerRes.data
  }
 
  dispatch({ type: FETCH_EVENT, payload });
}

export const addNewEvent = event => async dispatch => {
  var res = null;
  var fileData = new FormData();
  fileData.append('newImage', event.file);
  res = await axios.post(`${serverAddress}/api/admin/event/new`, event);
  res = await axios.put(`${serverAddress}/api/admin/event/detail/image/${res.data}`, fileData);

  const bannerRes = await axios.get(`${serverAddress}/api/event/banners`);
  const payload = {
    events: res.data,
    banners: bannerRes.data
  }
  
  dispatch({ type: FETCH_EVENT, payload });
}

export const deleteEvent = id => async dispatch => {
  const res = await axios.delete(`${serverAddress}/api/admin/event/delete/${id}`);

  const bannerRes = await axios.get(`${serverAddress}/api/event/banners`);
  const payload = {
    events: res.data,
    banners: bannerRes.data
  }
  
  dispatch({ type: FETCH_EVENT, payload });
}

export const addNewBanner = banner => async dispatch => {
  var res = null;
  var fileData = new FormData();
  fileData.append('newImage', banner.file);
  res = await axios.post(`${serverAddress}/api/admin/event/banner/new`, banner);
  res = await axios.put(`${serverAddress}/api/admin/event/banner/detail/image/${res.data}`, fileData);

  const eventRes = await axios.get(`${serverAddress}/api/event/list`);
  const payload = {
    events: eventRes.data,
    banners: res.data
  }
  
  dispatch({ type: FETCH_EVENT, payload});
}

export const updateBannerDetail = banner => async dispatch => {
  var res = null;
  if (banner.fileChanged) {
    var fileData = new FormData();
    fileData.append('newImage', banner.file);
    res = await axios.put(`${serverAddress}/api/admin/event/banner/detail/image/${banner.id}`, fileData);
  }
  res = await axios.put(`${serverAddress}/api/admin/event/banner/detail/${banner.id}`, banner);

  const eventRes = await axios.get(`${serverAddress}/api/event/list`);
  const payload = {
    events: eventRes.data,
    banners: res.data
  }
 
  dispatch({ type: FETCH_EVENT, payload });
}

export const deleteBanner = id => async dispatch => {
  const res = await axios.delete(`${serverAddress}/api/admin/event/banner/delete/${id}`);

  const eventRes = await axios.get(`${serverAddress}/api/event/list`);
  const payload = {
    events: eventRes.data,
    banners: res.data
  }

  dispatch({ type: FETCH_EVENT, payload });
}

// Actions for about section
export const updateAboutList = about => dispatch => {
  axios.put(`${serverAddress}/api/admin/about/list`, about);

  const payload = {
    people: about,
    photo: `${serverAddress}/static/about-group-photo.jpg?${Date.now()}`
  }
  
  dispatch({ type: FETCH_ABOUT, payload });
}

export const updateAboutDetail = person => async dispatch => {
  // dispatch({ type: FETCH_ABOUT, payload: res.data });
  var res = null;
  if (person.fileChanged) {
    var fileData = new FormData();
    fileData.append('newImage', person.file);
    res = await axios.put(`${serverAddress}/api/admin/about/detail/image/${person.id}`, fileData);
  }
  res = await axios.put(`${serverAddress}/api/admin/about/detail/${person.id}`, person);

  const payload = {
    people: res.data,
    photo: `${serverAddress}/static/about-group-photo.jpg?${Date.now()}`
  }

  dispatch({ type: FETCH_ABOUT, payload });
}

export const addNewAbout = person => async dispatch => {
  var res = null;
  var fileData = new FormData();
  fileData.append('newImage', person.file);
  res = await axios.post(`${serverAddress}/api/admin/about/new`, person);
  res = await axios.put(`${serverAddress}/api/admin/about/detail/image/${res.data}`, fileData);

  const payload = {
    people: res.data,
    photo: `${serverAddress}/static/about-group-photo.jpg?${Date.now()}`
  }

  dispatch({ type: FETCH_ABOUT, payload });
}

export const deleteAbout = id => async dispatch => {
  const res = await axios.delete(`${serverAddress}/api/admin/about/delete/${id}`);

  const payload = {
    people: res.data,
    photo: `${serverAddress}/static/about-group-photo.jpg?${Date.now()}`
  }

  dispatch({ type: FETCH_ABOUT, payload });
}

export const updateAboutPhoto = photo => async (dispatch, getState) => {
  var fileData = new FormData();
  fileData.append('newImage', photo.file);
  const res = await axios.put(`${serverAddress}/api/admin/about/photo`, fileData);
  var aboutState = {
    people: getState().about.people,
    photo: res.data
  }

  dispatch({ type: FETCH_ABOUT, payload: aboutState });
}