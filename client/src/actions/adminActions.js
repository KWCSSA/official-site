import axios from 'axios';

import {
	USER_LOGIN,
	FETCH_EVENT,
	FETCH_HOME,
	FETCH_ABOUT,
	FETCH_FRESHMAN,
	UPLOAD_START,
	UPLOAD_PROGRESS,
	UPLOAD_FINISH
} from '../TYPES';

const serverAddress = '';

function timeout(ms) {
	return new Promise(resolve =>
		setTimeout(() => {
			resolve();
		}, ms)
	);
}

export const adminLogin = password => async dispatch => {
	const res = await axios.post(`${serverAddress}/api/admin/login?password=${password}`, { password });
	dispatch({ type: USER_LOGIN, payload: res.data });
};

// Action for home section
export const updateHome = (home, password) => async dispatch => {
	const res = await axios.put(`${serverAddress}/api/admin/home?password=${password}`, home);

	dispatch({ type: FETCH_HOME, payload: res.data });
};

// Actions for events section
export const updateEventList = (events, password) => async (dispatch, getState) => {
	axios.put(`${serverAddress}/api/admin/event/list?password=${password}`, events);

	const payload = {
		events,
		banners: getState().event.banners
	};

	dispatch({ type: FETCH_EVENT, payload });
};

export const updateEventDetail = (event, password) => async (dispatch, getState) => {
	var res = null;
	if (event.fileChanged) {
		var fileData = new FormData();
		fileData.append('newImage', event.file);
		dispatch({ type: UPLOAD_START });
		res = await axios.put(`${serverAddress}/api/admin/event/detail/image/${event.id}?password=${password}`, fileData, {
			onUploadProgress: progressEvent => {
				dispatch({ type: UPLOAD_PROGRESS, payload: progressEvent.loaded / progressEvent.total * 100 });
			}
		});
		await timeout(600);
		dispatch({ type: UPLOAD_FINISH });
	}
	res = await axios.put(`${serverAddress}/api/admin/event/detail/${event.id}?password=${password}`, event);

	const payload = {
		events: res.data,
		banners: getState().event.banners
	};

	dispatch({ type: FETCH_EVENT, payload });
};

export const addNewEvent = (event, password) => async (dispatch, getState) => {
	var res = null;
	var fileData = new FormData();
	fileData.append('newImage', event.file);
	res = await axios.post(`${serverAddress}/api/admin/event/new?password=${password}`, event);
	dispatch({ type: UPLOAD_START });
	res = await axios.put(`${serverAddress}/api/admin/event/detail/image/${res.data}?password=${password}`, fileData, {
		onUploadProgress: progressEvent => {
			dispatch({ type: UPLOAD_PROGRESS, payload: progressEvent.loaded / progressEvent.total * 100 });
		}
	});
	await timeout(600);
	dispatch({ type: UPLOAD_FINISH });

	const payload = {
		events: res.data,
		banners: getState().event.banners
	};

	dispatch({ type: FETCH_EVENT, payload });
};

export const deleteEvent = (id, password) => async (dispatch, getState) => {
	const res = await axios.delete(`${serverAddress}/api/admin/event/delete/${id}?password=${password}`);

	const payload = {
		events: res.data,
		banners: getState().event.banners
	};

	dispatch({ type: FETCH_EVENT, payload });
};

export const addNewBanner = (banner, password) => async (dispatch, getState) => {
	var res = null;
	var fileData = null;
	res = await axios.post(`${serverAddress}/api/admin/event/banner/new?password=${password}`, banner);
	var bannerId = res.data;
	dispatch({ type: UPLOAD_START });
	if (banner.fileChanged && banner.fileChanged.b) {
		fileData = new FormData();
		fileData.append('newImage', banner.file.b);
		res = await axios.put(
			`${serverAddress}/api/admin/event/banner/detail/image/${bannerId}?version=banner&password=${password}`,
			fileData,
			{
				onUploadProgress: progressEvent => {
					dispatch({ type: UPLOAD_PROGRESS, payload: progressEvent.loaded / progressEvent.total * 100 });
				}
			}
		);
	}
	if (banner.fileChanged && banner.fileChanged.p) {
		fileData = new FormData();
		fileData.append('newImage', banner.file.p);
		res = await axios.put(
			`${serverAddress}/api/admin/event/banner/detail/image/${bannerId}?version=poster&password=${password}`,
			fileData,
			{
				onUploadProgress: progressEvent => {
					dispatch({ type: UPLOAD_PROGRESS, payload: progressEvent.loaded / progressEvent.total * 100 });
				}
			}
		);
	}
	await timeout(600);
	dispatch({ type: UPLOAD_FINISH });
	if (!banner.fileChanged) {
		res = await axios.get(`${serverAddress}/api/event/banners`);
	}

	const payload = {
		events: getState().event.events,
		banners: res.data
	};

	dispatch({ type: FETCH_EVENT, payload });
};

export const updateBannerDetail = (banner, password) => async (dispatch, getState) => {
	var res = null;
	var fileData = null;
	dispatch({ type: UPLOAD_START });
	if (banner.fileChanged && banner.fileChanged.b) {
		fileData = new FormData();
		fileData.append('newImage', banner.file.b);
		res = await axios.put(
			`${serverAddress}/api/admin/event/banner/detail/image/${banner.id}?version=banner&password=${password}`,
			fileData,
			{
				onUploadProgress: progressEvent => {
					dispatch({ type: UPLOAD_PROGRESS, payload: progressEvent.loaded / progressEvent.total * 100 });
				}
			}
		);
	}
	if (banner.fileChanged && banner.fileChanged.p) {
		fileData = new FormData();
		fileData.append('newImage', banner.file.p);
		res = await axios.put(
			`${serverAddress}/api/admin/event/banner/detail/image/${banner.id}?version=poster&password=${password}`,
			fileData,
			{
				onUploadProgress: progressEvent => {
					dispatch({ type: UPLOAD_PROGRESS, payload: progressEvent.loaded / progressEvent.total * 100 });
				}
			}
		);
	}
	await timeout(600);
	dispatch({ type: UPLOAD_FINISH });
	res = await axios.put(`${serverAddress}/api/admin/event/banner/detail/${banner.id}?password=${password}`, banner);

	const payload = {
		events: getState().event.events,
		banners: res.data
	};

	dispatch({ type: FETCH_EVENT, payload });
};

export const deleteBanner = (id, password) => async (dispatch, getState) => {
	const res = await axios.delete(`${serverAddress}/api/admin/event/banner/delete/${id}?password=${password}`);

	const payload = {
		events: getState().event.events,
		banners: res.data
	};

	dispatch({ type: FETCH_EVENT, payload });
};

// Actions for about section
export const updateAboutList = (about, password) => (dispatch, getState) => {
	axios.put(`${serverAddress}/api/admin/about/list?password=${password}`, about);

	const payload = {
		people: about,
		photo: getState().about.photo
	};

	dispatch({ type: FETCH_ABOUT, payload });
};

export const updateAboutDetail = (person, password) => async (dispatch, getState) => {
	// dispatch({ type: FETCH_ABOUT, payload: res.data });
	var res = null;
	if (person.fileChanged) {
		var fileData = new FormData();
		fileData.append('newImage', person.file);
		dispatch({ type: UPLOAD_START });
		res = await axios.put(`${serverAddress}/api/admin/about/detail/image/${person.id}?password=${password}`, fileData, {
			onUploadProgress: progressEvent => {
				dispatch({ type: UPLOAD_PROGRESS, payload: progressEvent.loaded / progressEvent.total * 100 });
			}
		});
		await timeout(600);
		dispatch({ type: UPLOAD_FINISH });
	}
	res = await axios.put(`${serverAddress}/api/admin/about/detail/${person.id}?password=${password}`, person);

	const payload = {
		people: res.data,
		photo: getState().about.photo
	};

	dispatch({ type: FETCH_ABOUT, payload });
};

export const addNewAbout = (person, password) => async (dispatch, getState) => {
	var res = null;
	var fileData = new FormData();
	fileData.append('newImage', person.file);
	res = await axios.post(`${serverAddress}/api/admin/about/new?password=${password}`, person);
	dispatch({ type: UPLOAD_START });
	res = await axios.put(`${serverAddress}/api/admin/about/detail/image/${res.data}?password=${password}`, fileData, {
		onUploadProgress: progressEvent => {
			dispatch({ type: UPLOAD_PROGRESS, payload: progressEvent.loaded / progressEvent.total * 100 });
		}
	});
	await timeout(600);
	dispatch({ type: UPLOAD_FINISH });

	const payload = {
		people: res.data,
		photo: getState().about.photo
	};

	dispatch({ type: FETCH_ABOUT, payload });
};

export const deleteAbout = (id, password) => async (dispatch, getState) => {
	const res = await axios.delete(`${serverAddress}/api/admin/about/delete/${id}?password=${password}`);

	const payload = {
		people: res.data,
		photo: getState().about.photo
	};

	dispatch({ type: FETCH_ABOUT, payload });
};

export const updateAboutPhoto = (photo, password) => async (dispatch, getState) => {
	var fileData = new FormData();
	fileData.append('newImage', photo.file);
	dispatch({ type: UPLOAD_START });
	const res = await axios.put(`${serverAddress}/api/admin/about/photo?password=${password}`, fileData, {
		onUploadProgress: progressEvent => {
			dispatch({ type: UPLOAD_PROGRESS, payload: progressEvent.loaded / progressEvent.total * 100 });
		}
	});
	await timeout(600);
	dispatch({ type: UPLOAD_FINISH });
	var aboutState = {
		people: getState().about.people,
		photo: res.data
	};

	dispatch({ type: FETCH_ABOUT, payload: aboutState });
};

// Actions for freshman section
export const updateFreshmanMessage = (message, password) => async (dispatch, getState) => {
	const res = await axios.put(`${serverAddress}/api/admin/freshman/message?password=${password}`, message);

	dispatch({ type: FETCH_FRESHMAN, payload: res.data });
};

export const updateFreshmanBooklets = (booklets, password) => async (dispatch, getState) => {
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
	dispatch({ type: UPLOAD_START });
	res = await axios.put(`${serverAddress}/api/admin/freshman/booklets?password=${password}`, fileData, {
		onUploadProgress: progressEvent => {
			dispatch({ type: UPLOAD_PROGRESS, payload: progressEvent.loaded / progressEvent.total * 100 });
		}
	});
	await timeout(600);
	dispatch({ type: UPLOAD_FINISH });

	dispatch({ type: FETCH_FRESHMAN, payload: res.data });
};

export const addNewFreshmanPost = (post, password) => async dispatch => {
	const res = await axios.post(`${serverAddress}/api/admin/freshman/post?password=${password}`, post);

	dispatch({ type: FETCH_FRESHMAN, payload: res.data });
};

export const updateFreshmanList = (posts, password) => (dispatch, getState) => {
	axios.put(`${serverAddress}/api/admin/freshman/postList?password=${password}`, posts);
	var payload = getState().freshman;
	payload.posts = posts;

	dispatch({ type: FETCH_FRESHMAN, payload });
};

export const updateFreshmanPostDetail = (post, password) => async dispatch => {
	const res = await axios.put(`${serverAddress}/api/admin/freshman/post/${post.id}?password=${password}`, post);

	dispatch({ type: FETCH_FRESHMAN, payload: res.data });
};

export const deleteFreshmanPost = (id, password) => async dispatch => {
	const res = await axios.delete(`${serverAddress}/api/admin/freshman/post/${id}?password=${password}`);

	dispatch({ type: FETCH_FRESHMAN, payload: res.data });
};
