import { UPLOAD_START, UPLOAD_PROGRESS, UPLOAD_FINISH } from '../TYPES';

export default function(state = { progress: 100, finished: true }, action) {
	switch (action.type) {
		case UPLOAD_START: {
			return { progress: 0, finished: false };
		}
		case UPLOAD_PROGRESS: {
			return { progress: action.payload, finished: false };
		}
		case UPLOAD_FINISH: {
			return { progress: 100, finished: true };
		}
		default: {
			return state;
		}
	}
}
