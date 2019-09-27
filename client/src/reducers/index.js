import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import eventReducer from './eventReducer';
import aboutReducer from './aboutReducer';
import contactReducer from './contactReducer';
import adminReducer from './adminReducer';
import homeReducer from './homeReducer';

export default combineReducers({
  home: homeReducer,
  event: eventReducer,
  about: aboutReducer,
  contact: contactReducer,
  admin: adminReducer,
  form: reduxFormReducer
});