import axios from 'axios';

import {
	ADMIN_STATUS,
	FETCH_EVENT,
	FETCH_HOME,
	FETCH_ABOUT,
	FETCH_FRESHMAN,
	UPLOAD_START,
	UPLOAD_PROGRESS,
	UPLOAD_FINISH
} from '../TYPES';

var serverAddress = '';

function timeout(ms) {
	return new Promise(resolve =>
		setTimeout(() => {
			resolve();
		}, ms)
	);
}

export const fetchAdminLoginStatus = () => async dispatch => {
	const res = await axios.get(`${serverAddress}/admin/status`);
	dispatch({ type: ADMIN_STATUS, payload: res.data });
};

export const adminLogin = (username, password) => async dispatch => {
	try {
		const res = await axios.post(`${serverAddress}/admin/login`, { username, password });
		dispatch({ type: ADMIN_STATUS, payload: res.data });
	} catch (error) {
		dispatch({ type: ADMIN_STATUS, payload: null });
	}
};

// Action for home section
export const updateHome = home => async dispatch => {
	// Check for authentication status
	var res = await axios.get(`${serverAddress}/admin/status`);
	if (!res.data) {
		return dispatch({ type: ADMIN_STATUS, payload: null });
	}

	res = await axios.put(`${serverAddress}/api/admin/home`, home);

	dispatch({ type: FETCH_HOME, payload: res.data });
};

// Actions for events section
export const updateEventList = events => async (dispatch, getState) => {
	// Check for authentication status
	var res = await axios.get(`${serverAddress}/admin/status`);
	if (!res.data) {
		return dispatch({ type: ADMIN_STATUS, payload: null });
	}

	axios.put(`${serverAddress}/api/admin/event/list`, events);

	const payload = {
		events,
		banners: getState().event.banners
	};

	dispatch({ type: FETCH_EVENT, payload });
};

export const updateEventDetail = event => async (dispatch, getState) => {
	// Check for authentication status
	var res = await axios.get(`${serverAddress}/admin/status`);
	if (!res.data) {
		return dispatch({ type: ADMIN_STATUS, payload: null });
	}

	if (event.fileChanged) {
		var fileData = new FormData();
		fileData.append('newImage', event.file);
		dispatch({ type: UPLOAD_START });
		res = await axios.put(`${serverAddress}/api/admin/event/detail/image/${event.id}`, fileData, {
			onUploadProgress: progressEvent => {
				dispatch({ type: UPLOAD_PROGRESS, payload: progressEvent.loaded / progressEvent.total * 100 });
			}
		});
		await timeout(600);
		dispatch({ type: UPLOAD_FINISH });
	}
	res = await axios.put(`${serverAddress}/api/admin/event/detail/${event.id}`, event);

	const payload = {
		events: res.data,
		banners: getState().event.banners
	};

	dispatch({ type: FETCH_EVENT, payload });
};

export const addNewEvent = event => async (dispatch, getState) => {
	// Check for authentication status
	var res = await axios.get(`${serverAddress}/admin/status`);
	if (!res.data) {
		return dispatch({ type: ADMIN_STATUS, payload: null });
	}

	var fileData = new FormData();
	fileData.append('newImage', event.file);
	res = await axios.post(`${serverAddress}/api/admin/event/new`, event);
	dispatch({ type: UPLOAD_START });
	res = await axios.put(`${serverAddress}/api/admin/event/detail/image/${res.data}`, fileData, {
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

export const deleteEvent = id => async (dispatch, getState) => {
	// Check for authentication status
	var res = await axios.get(`${serverAddress}/admin/status`);
	if (!res.data) {
		return dispatch({ type: ADMIN_STATUS, payload: null });
	}

	res = await axios.delete(`${serverAddress}/api/admin/event/delete/${id}`);

	const payload = {
		events: res.data,
		banners: getState().event.banners
	};

	dispatch({ type: FETCH_EVENT, payload });
};

export const addNewBanner = banner => async (dispatch, getState) => {
	// Check for authentication status
	var res = await axios.get(`${serverAddress}/admin/status`);
	if (!res.data) {
		return dispatch({ type: ADMIN_STATUS, payload: null });
	}

	var fileData = null;
	res = await axios.post(`${serverAddress}/api/admin/event/banner/new`, banner);
	var bannerId = res.data;
	dispatch({ type: UPLOAD_START });
	if (banner.fileChanged && banner.fileChanged.b) {
		fileData = new FormData();
		fileData.append('newImage', banner.file.b);
		res = await axios.put(`${serverAddress}/api/admin/event/banner/detail/image/${bannerId}?version=banner`, fileData, {
			onUploadProgress: progressEvent => {
				dispatch({ type: UPLOAD_PROGRESS, payload: progressEvent.loaded / progressEvent.total * 100 });
			}
		});
	}
	if (banner.fileChanged && banner.fileChanged.p) {
		fileData = new FormData();
		fileData.append('newImage', banner.file.p);
		res = await axios.put(`${serverAddress}/api/admin/event/banner/detail/image/${bannerId}?version=poster`, fileData, {
			onUploadProgress: progressEvent => {
				dispatch({ type: UPLOAD_PROGRESS, payload: progressEvent.loaded / progressEvent.total * 100 });
			}
		});
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

export const updateBannerDetail = banner => async (dispatch, getState) => {
	// Check for authentication status
	var res = await axios.get(`${serverAddress}/admin/status`);
	if (!res.data) {
		return dispatch({ type: ADMIN_STATUS, payload: null });
	}

	var fileData = null;
	dispatch({ type: UPLOAD_START });
	if (banner.fileChanged && banner.fileChanged.b) {
		fileData = new FormData();
		fileData.append('newImage', banner.file.b);
		res = await axios.put(
			`${serverAddress}/api/admin/event/banner/detail/image/${banner.id}?version=banner`,
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
			`${serverAddress}/api/admin/event/banner/detail/image/${banner.id}?version=poster`,
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
	res = await axios.put(`${serverAddress}/api/admin/event/banner/detail/${banner.id}`, banner);

	const payload = {
		events: getState().event.events,
		banners: res.data
	};

	dispatch({ type: FETCH_EVENT, payload });
};

export const deleteBanner = id => async (dispatch, getState) => {
	// Check for authentication status
	var res = await axios.get(`${serverAddress}/admin/status`);
	if (!res.data) {
		return dispatch({ type: ADMIN_STATUS, payload: null });
	}

	res = await axios.delete(`${serverAddress}/api/admin/event/banner/delete/${id}`);

	const payload = {
		events: getState().event.events,
		banners: res.data
	};

	dispatch({ type: FETCH_EVENT, payload });
};

// Actions for about section
export const updateAboutList = about => async (dispatch, getState) => {
	// Check for authentication status
	var res = await axios.get(`${serverAddress}/admin/status`);
	if (!res.data) {
		return dispatch({ type: ADMIN_STATUS, payload: null });
	}

	axios.put(`${serverAddress}/api/admin/about/list`, about);

	const payload = {
		people: about,
		photo: getState().about.photo
	};

	dispatch({ type: FETCH_ABOUT, payload });
};

export const updateAboutDetail = person => async (dispatch, getState) => {
	// Check for authentication status
	var res = await axios.get(`${serverAddress}/admin/status`);
	if (!res.data) {
		return dispatch({ type: ADMIN_STATUS, payload: null });
	}

	if (person.fileChanged) {
		var fileData = new FormData();
		fileData.append('newImage', person.file);
		dispatch({ type: UPLOAD_START });
		res = await axios.put(`${serverAddress}/api/admin/about/detail/image/${person.id}`, fileData, {
			onUploadProgress: progressEvent => {
				dispatch({ type: UPLOAD_PROGRESS, payload: progressEvent.loaded / progressEvent.total * 100 });
			}
		});
		await timeout(600);
		dispatch({ type: UPLOAD_FINISH });
	}
	res = await axios.put(`${serverAddress}/api/admin/about/detail/${person.id}`, person);

	const payload = {
		people: res.data,
		photo: getState().about.photo
	};

	dispatch({ type: FETCH_ABOUT, payload });
};

export const addNewAbout = person => async (dispatch, getState) => {
	// Check for authentication status
	var res = await axios.get(`${serverAddress}/admin/status`);
	if (!res.data) {
		return dispatch({ type: ADMIN_STATUS, payload: null });
	}

	var fileData = new FormData();
	fileData.append('newImage', person.file);
	res = await axios.post(`${serverAddress}/api/admin/about/new`, person);
	dispatch({ type: UPLOAD_START });
	res = await axios.put(`${serverAddress}/api/admin/about/detail/image/${res.data}`, fileData, {
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

export const deleteAbout = id => async (dispatch, getState) => {
	// Check for authentication status
	var res = await axios.get(`${serverAddress}/admin/status`);
	if (!res.data) {
		return dispatch({ type: ADMIN_STATUS, payload: null });
	}

	res = await axios.delete(`${serverAddress}/api/admin/about/delete/${id}`);

	const payload = {
		people: res.data,
		photo: getState().about.photo
	};

	dispatch({ type: FETCH_ABOUT, payload });
};

export const updateAboutPhoto = photo => async (dispatch, getState) => {
	// Check for authentication status
	var res = await axios.get(`${serverAddress}/admin/status`);
	if (!res.data) {
		return dispatch({ type: ADMIN_STATUS, payload: null });
	}

	var fileData = new FormData();
	fileData.append('newImage', photo.file);
	dispatch({ type: UPLOAD_START });
	res = await axios.put(`${serverAddress}/api/admin/about/photo`, fileData, {
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
export const updateFreshmanMessage = message => async (dispatch, getState) => {
	// Check for authentication status
	var res = await axios.get(`${serverAddress}/admin/status`);
	if (!res.data) {
		return dispatch({ type: ADMIN_STATUS, payload: null });
	}

	res = await axios.put(`${serverAddress}/api/admin/freshman/message`, message);

	dispatch({ type: FETCH_FRESHMAN, payload: res.data });
};

export const updateFreshmanBooklets = booklets => async (dispatch, getState) => {
	// Check for authentication status
	var res = await axios.get(`${serverAddress}/admin/status`);
	if (!res.data) {
		return dispatch({ type: ADMIN_STATUS, payload: null });
	}

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
	res = await axios.put(`${serverAddress}/api/admin/freshman/booklets`, fileData, {
		onUploadProgress: progressEvent => {
			dispatch({ type: UPLOAD_PROGRESS, payload: progressEvent.loaded / progressEvent.total * 100 });
		}
	});
	await timeout(600);
	dispatch({ type: UPLOAD_FINISH });

	dispatch({ type: FETCH_FRESHMAN, payload: res.data });
};

export const addNewFreshmanPost = post => async dispatch => {
	// Check for authentication status
	var res = await axios.get(`${serverAddress}/admin/status`);
	if (!res.data) {
		return dispatch({ type: ADMIN_STATUS, payload: null });
	}

	res = await axios.post(`${serverAddress}/api/admin/freshman/post`, post);

	dispatch({ type: FETCH_FRESHMAN, payload: res.data });
};

export const updateFreshmanList = posts => async (dispatch, getState) => {
	// Check for authentication status
	var res = await axios.get(`${serverAddress}/admin/status`);
	if (!res.data) {
		return dispatch({ type: ADMIN_STATUS, payload: null });
	}

	axios.put(`${serverAddress}/api/admin/freshman/postList`, posts);
	var payload = getState().freshman;
	payload.posts = posts;

	dispatch({ type: FETCH_FRESHMAN, payload });
};

export const updateFreshmanPostDetail = post => async dispatch => {
	// Check for authentication status
	var res = await axios.get(`${serverAddress}/admin/status`);
	if (!res.data) {
		return dispatch({ type: ADMIN_STATUS, payload: null });
	}

	res = await axios.put(`${serverAddress}/api/admin/freshman/post/${post.id}`, post);

	dispatch({ type: FETCH_FRESHMAN, payload: res.data });
};

export const deleteFreshmanPost = id => async dispatch => {
	// Check for authentication status
	var res = await axios.get(`${serverAddress}/admin/status`);
	if (!res.data) {
		return dispatch({ type: ADMIN_STATUS, payload: null });
	}

	res = await axios.delete(`${serverAddress}/api/admin/freshman/post/${id}`);

	dispatch({ type: FETCH_FRESHMAN, payload: res.data });
};
