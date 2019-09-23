import { combineReducers } from 'redux';

import eventReducer from './eventReducer';
import aboutReducer from './aboutReducer';

export default combineReducers({
  event: eventReducer,
  about: aboutReducer
});