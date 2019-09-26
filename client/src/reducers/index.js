import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import eventReducer from './eventReducer';
import aboutReducer from './aboutReducer';
import contactReducer from './contactReducer';
import adminReducer from './adminReducer';

export default combineReducers({
  event: eventReducer,
  about: aboutReducer,
  contact: contactReducer,
  admin: adminReducer,
  form: reduxFormReducer
});