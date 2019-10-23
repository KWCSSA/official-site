import { ADMIN_STATUS } from '../TYPES';

export default function(state = { user: null }, action) {
	switch (action.type) {
		case ADMIN_STATUS: {
			return {
				user: action.payload
			};
		}
		default: {
			return state;
		}
	}
}
