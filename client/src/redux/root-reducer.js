import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import bagReducer from './bag/bag.reducer';

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['cart']
// };

const rootReducer = combineReducers({
      user: userReducer,
      bag: bagReducer
});

export default rootReducer;
