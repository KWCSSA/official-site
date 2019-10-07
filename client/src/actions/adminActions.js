import axios from 'axios';

import { USER_LOGIN, FETCH_EVENT, FETCH_HOME, FETCH_ABOUT, FETCH_FRESHMAN } from '../TYPES';

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
export const updateEventList = events => async (dispatch, getState) => {
  axios.put(`${serverAddress}/api/admin/event/list`, events);

  const payload = {
    events,
    banners: getState().event.banners
  }

  dispatch({ type: FETCH_EVENT, payload });
}

export const updateEventDetail = event => async (dispatch, getState) => {
  var res = null;
  if (event.fileChanged) {
    var fileData = new FormData();
    fileData.append('newImage', event.file);
    res = await axios.put(`${serverAddress}/api/admin/event/detail/image/${event.id}`, fileData);
  }
  res = await axios.put(`${serverAddress}/api/admin/event/detail/${event.id}`, event);

  const payload = {
    events: res.data,
    banners: getState().event.banners
  }

  dispatch({ type: FETCH_EVENT, payload });
}

export const addNewEvent = event => async (dispatch, getState) => {
  var res = null;
  var fileData = new FormData();
  fileData.append('newImage', event.file);
  res = await axios.post(`${serverAddress}/api/admin/event/new`, event);
  res = await axios.put(`${serverAddress}/api/admin/event/detail/image/${res.data}`, fileData);

  const payload = {
    events: res.data,
    banners: getState().event.banners
  }

  dispatch({ type: FETCH_EVENT, payload });
}

export const deleteEvent = id => async (dispatch, getState) => {
  const res = await axios.delete(`${serverAddress}/api/admin/event/delete/${id}`);

  const payload = {
    events: res.data,
    banners: getState().event.banners
  }

  dispatch({ type: FETCH_EVENT, payload });
}

export const addNewBanner = banner => async (dispatch, getState) => {
  var res = null;
  var fileData = null;
  res = await axios.post(`${serverAddress}/api/admin/event/banner/new`, banner);
  var bannerId = res.data;
  if (banner.fileChanged && banner.fileChanged.b) {
    fileData = new FormData();
    fileData.append('newImage', banner.file.b);
    res = await axios.put(`${serverAddress}/api/admin/event/banner/detail/image/${bannerId}?version=banner`, fileData);
  }
  if (banner.fileChanged && banner.fileChanged.p) {
    fileData = new FormData();
    fileData.append('newImage', banner.file.p);
    res = await axios.put(`${serverAddress}/api/admin/event/banner/detail/image/${bannerId}?version=poster`, fileData);
  }
  if (!banner.fileChanged) {
    res = await axios.get(`${serverAddress}/api/event/banners`);
  }

  const payload = {
    events: getState().event.events,
    banners: res.data
  }

  dispatch({ type: FETCH_EVENT, payload });
}

export const updateBannerDetail = banner => async (dispatch, getState) => {
  var res = null;
  var fileData = null;
  if (banner.fileChanged && banner.fileChanged.b) {
    fileData = new FormData();
    fileData.append('newImage', banner.file.b);
    res = await axios.put(`${serverAddress}/api/admin/event/banner/detail/image/${banner.id}?version=banner`, fileData);
  }
  if (banner.fileChanged && banner.fileChanged.p) {
    fileData = new FormData();
    fileData.append('newImage', banner.file.p);
    res = await axios.put(`${serverAddress}/api/admin/event/banner/detail/image/${banner.id}?version=poster`, fileData);
  }
  res = await axios.put(`${serverAddress}/api/admin/event/banner/detail/${banner.id}`, banner);

  const payload = {
    events: getState().event.events,
    banners: res.data
  }

  dispatch({ type: FETCH_EVENT, payload });
}

export const deleteBanner = id => async (dispatch, getState) => {
  const res = await axios.delete(`${serverAddress}/api/admin/event/banner/delete/${id}`);

  const payload = {
    events: getState().event.events,
    banners: res.data
  }

  dispatch({ type: FETCH_EVENT, payload });
}



// Actions for about section
export const updateAboutList = about => (dispatch, getState) => {
  axios.put(`${serverAddress}/api/admin/about/list`, about);

  const payload = {
    people: about,
    photo: getState().about.photo
  }

  dispatch({ type: FETCH_ABOUT, payload });
}

export const updateAboutDetail = person => async (dispatch, getState) => {
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
    photo: getState().about.photo
  }

  dispatch({ type: FETCH_ABOUT, payload });
}

export const addNewAbout = person => async (dispatch, getState) => {
  var res = null;
  var fileData = new FormData();
  fileData.append('newImage', person.file);
  res = await axios.post(`${serverAddress}/api/admin/about/new`, person);
  res = await axios.put(`${serverAddress}/api/admin/about/detail/image/${res.data}`, fileData);

  const payload = {
    people: res.data,
    photo: getState().about.photo
  }

  dispatch({ type: FETCH_ABOUT, payload });
}

export const deleteAbout = id => async (dispatch, getState) => {
  const res = await axios.delete(`${serverAddress}/api/admin/about/delete/${id}`);

  const payload = {
    people: res.data,
    photo: getState().about.photo
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



// Actions for freshman section
export const updateFreshmanMessage = message => async (dispatch, getState) => {
  const res = await axios.put(`${serverAddress}/api/admin/freshman/message`, message);

  dispatch({ type: FETCH_FRESHMAN, payload: res.data });
}

export const updateFreshmanBooklets = booklets => async (dispatch, getState) => {
  var res = null;
  var fileData = new FormData();
  if (booklets.NSPicChanged) {
    fileData.append('NSPic', booklets.NSPic);
  }
  if (booklets.NSPdfChanged) {
    fileData.append('NSPdf', booklets.NSPdf);
  }
  if (booklets.SFPicChanged) {
    fileData.append('SFPic', booklets.SFPic);
  }
  if (booklets.SFPdfChanged) {
    fileData.append('SFPdf', booklets.SFPdf);
  }
  res = await axios.put(`${serverAddress}/api/admin/freshman/booklets`, fileData);
  
  dispatch({ type: FETCH_FRESHMAN, payload: res.data });
}