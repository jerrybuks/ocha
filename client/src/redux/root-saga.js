import { all, call } from 'redux-saga/effects';
import { userSagas } from './user/user.sagas';
import { bagSagas } from './bag/bag.sagas'

export default function* rootSaga() {
  yield all([call(userSagas),call(bagSagas)]);

}
