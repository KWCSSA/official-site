import { FETCH_FRESHMAN } from '../TYPES';

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_FRESHMAN: {
			return action.payload || [];
		}
		default: {
			return state;
		}
	}
}
