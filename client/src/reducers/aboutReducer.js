import { FETCH_ABOUT } from '../TYPES';

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_ABOUT: {
			return action.payload || [];
		}
		default: {
			return state;
		}
	}
}
