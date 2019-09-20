import axios from 'axios';
import { FETCH_HIGHLIGHT_EVENT } from '../TYPES'

export const fetchHighlightEvent = () => async dispatch => {
    // const res = await axios.get('/api/highlight');
    const res = await axios.get('http://localhost:8080/api/highlight');
    dispatch({ type: FETCH_HIGHLIGHT_EVENT, payload: res.data });
};