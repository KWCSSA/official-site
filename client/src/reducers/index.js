import { combineReducers } from 'redux';

import eventReducer from './eventReducer';
import aboutReducer from './aboutReducer';
import contactReducer from './contactReducer';

export default combineReducers({
  event: eventReducer,
  about: aboutReducer,
  contact: contactReducer
});